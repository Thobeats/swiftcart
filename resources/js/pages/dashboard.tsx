import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Order } from '@/types';

export default function Dashboard({
    totalRevenue,
    pendingOrders,
    recentOrders,
    completedOrders,
}: {
    totalRevenue: number;
    pendingOrders: number;
    recentOrders: Omit<Order, 'customer'>[];
    completedOrders: number;
}) {
    return (
        <AppLayout>
            <Head title='Dashboard'/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Orders Overview
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                A quick summary of your recent orders and
                                activity.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border bg-white p-6">
                                <p className="text-muted-foreground text-sm">
                                    Total Orders
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                    {pendingOrders + completedOrders}
                                </p>
                            </div>

                            <div className="rounded-lg border bg-white p-6">
                                <p className="text-muted-foreground text-sm">
                                    Pending
                                </p>
                                <p className="mt-2 text-2xl font-bold text-yellow-600">
                                    {pendingOrders}
                                </p>
                            </div>

                            <div className="rounded-lg border bg-white p-6">
                                <p className="text-muted-foreground text-sm">
                                    Completed
                                </p>
                                <p className="mt-2 text-2xl font-bold text-green-600">
                                    {completedOrders}
                                </p>
                            </div>

                            <div className="rounded-lg border bg-white p-6">
                                <p className="text-muted-foreground text-sm">
                                    Total Revenue
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(totalRevenue)}
                                </p>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="rounded-lg border bg-white">
                            <div className="border-b px-6 py-4">
                                <h3 className="text-lg font-medium">
                                    Recent Orders
                                </h3>
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
                                        {recentOrders.length > 0 ? (
                                            recentOrders.map(
                                                ({
                                                    orderNo,
                                                    status,
                                                    price,
                                                    date,
                                                }) => (
                                                    <tr key={orderNo}>
                                                        <td className="px-6 py-4 text-sm font-medium">
                                                            {orderNo}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                    status ===
                                                                    'Completed'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : status ===
                                                                            'Pending'
                                                                          ? 'bg-yellow-100 text-yellow-700'
                                                                          : 'bg-gray-100 text-gray-700'
                                                                }`}
                                                            >
                                                                {status}
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm">
                                                            {new Intl.NumberFormat(
                                                                'en-US',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'USD',
                                                                },
                                                            ).format(price)}
                                                        </td>

                                                        <td className="text-muted-foreground px-6 py-4 text-sm">
                                                            {date}
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="text-muted-foreground px-6 py-8 text-center text-sm"
                                                >
                                                    No recent orders found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
