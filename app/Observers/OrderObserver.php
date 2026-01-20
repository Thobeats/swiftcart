<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\Product;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        $stockTreshold = 5;
        ///Reduce the stock after a order is created
        foreach($order->items as $item) {
            $product = $item->product;
            $product->decrement('stock_quantity', $item->quantity);

            if ($product->stock_quantity <= $stockTreshold && !$product->out_of_stock) {
                /// Update the product
                $product->out_of_stock = true;
                $product->save();

                //// Send Email to the Admin
            }
        }
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
