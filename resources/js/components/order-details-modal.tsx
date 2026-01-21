"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/types";


interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string | number;
  items: OrderItem[];
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  orderNumber,
  items,
}: OrderDetailsModalProps) {
  const formattedCurrency = (val: number) => {
    return val.toLocaleString(undefined, { style: "currency", currency: "USD" });
  };

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg transform bg-background border-l border-border shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <div className="text-sm text-muted-foreground">Order No: {orderNumber}</div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-sm text-muted-foreground">No items for this order.</div>
            ) : (
              <div className="space-y-4">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="pb-2">Product</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Quantity</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => (
                      <tr key={it.id} className="border-t border-border">
                        <td className="py-3 align-top">{it.product_name}</td>
                        <td className="py-3 align-top">{formattedCurrency(it.price)}</td>
                        <td className="py-3 align-top">{it.quantity}</td>
                        <td className="py-3 text-right align-top">{formattedCurrency(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end border-t border-border pt-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Grand total</div>
                    <div className="text-lg font-semibold">{formattedCurrency(total)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 flex justify-end">
            <Button onClick={onClose} className="h-10">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
