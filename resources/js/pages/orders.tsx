'use client';

import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import { OrderDetailsModal } from '@/components/order-details-modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Order, OrderItem } from '@/types';

interface OrderDetailsModalProps {
    items: OrderItem[];
    orderNo: string;
}

export default function OrdersPage({
    orders,
    initialPageSize = 10,
}: {
    orders: Order[];
    initialPageSize?: number;
}) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsModalProps>({
        items: [],
        orderNo: '',
    });

    const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return orders.slice(start, start + pageSize);
    }, [orders, page, pageSize]);

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
    const setToPage = (p: number) =>
        setPage(Math.min(Math.max(1, p), totalPages));

    // reset page when pageSize or orders change
    useMemo(() => setPage(1), []);

    const checkDetails = async (orderId: string) => {
        try {
            const res = await fetch(`/orders/detail/${orderId}`);
            if (!res.ok) throw await res.text();
            const data = await res.json();
            setOrderDetails({
                items: data.items || [],
                orderNo: data.orderNo || '',
            });
        } catch (err) {
            console.error('Failed to load order details', err);
        }
    };

    return (
        <AppLayout>
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="rounded-lg border bg-white">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h3 className="text-lg font-medium">Orders</h3>

                            <div className="flex items-center space-x-3">
                                <label className="text-muted-foreground text-sm">
                                    Rows:
                                </label>
                                <select
                                    value={pageSize}
                                    onChange={(e) =>
                                        setPageSize(Number(e.target.value))
                                    }
                                    className="rounded border px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium uppercase">
                                            Order #
                                        </th>
                                        <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium uppercase">
                                            Status
                                        </th>
                                        <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium uppercase">
                                            Total
                                        </th>
                                        <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium uppercase">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y bg-white">
                                    {paginated.length > 0 ? (
                                        paginated.map((o) => (
                                            <tr key={o.orderNo}>
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    <Button
                                                        variant={'ghost'}
                                                        onClick={() =>
                                                            checkDetails(o.id)
                                                        }
                                                    >
                                                        {o.orderNo}
                                                    </Button>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            o.status ===
                                                            'Completed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : o.status ===
                                                                    'Pending'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {new Intl.NumberFormat(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        },
                                                    ).format(
                                                        (o as {price: number}).price ?? 0,
                                                    )}
                                                </td>
                                                <td className="text-muted-foreground px-6 py-4 text-sm">
                                                    {o.date
                                                        ? new Date(
                                                              o.date,
                                                          ).toLocaleString()
                                                        : '—'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="text-muted-foreground px-6 py-8 text-center text-sm"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t px-6 py-3">
                            <div className="text-muted-foreground text-sm">
                                Showing {(page - 1) * pageSize + 1}-
                                {Math.min(page * pageSize, orders.length)} of{' '}
                                {orders.length}
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goPrev}
                                    disabled={page === 1}
                                    className="rounded border px-3 py-1 disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                {/* simple page buttons (show up to 5 around current) */}
                                <div className="flex items-center space-x-1">
                                    {Array.from({
                                        length: Math.min(5, totalPages),
                                    }).map((_, i) => {
                                        const half = Math.floor(5 / 2);
                                        let start = Math.max(
                                            1,
                                            Math.min(
                                                page - half,
                                                totalPages - 4,
                                            ),
                                        );
                                        if (totalPages <= 5) start = 1;
                                        const p = start + i;
                                        if (p > totalPages) return null;
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => setToPage(p)}
                                                className={`rounded px-2 py-1 ${p === page ? 'bg-primary text-white' : 'border'}`}
                                            >
                                                {p}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={goNext}
                                    disabled={page === totalPages}
                                    className="rounded border px-3 py-1 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <OrderDetailsModal
                        isOpen={orderDetails.items.length > 0}
                        orderNumber={orderDetails.orderNo}
                        items={orderDetails.items}
                        onClose={() => setOrderDetails({items: [], orderNo: ""})}
                    />
                }
            </div>
        </AppLayout>
    );
}
