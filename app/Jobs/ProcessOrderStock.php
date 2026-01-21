<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Mail\LowStockAlert;
use Illuminate\Support\Facades\Mail;

class ProcessOrderStock implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $orderId
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $stockThreshold = 5;
        $order = Order::with('items.product')->find($this->orderId);

        DB::transaction(function () use ($order, $stockThreshold) {

            foreach ($order->items as $item) {

                $product = $item->product;

                if (!$product) {
                    continue;
                }

                // Reduce stock
                $product->decrement('stock_quantity', $item->quantity);

                // Refresh value after decrement
                $product->refresh();

                // Mark as out of stock & notify
                if (
                    $product->stock_quantity <= $stockThreshold &&
                    !$product->out_of_stock
                ) {
                    $product->update([
                        'out_of_stock' => true,
                    ]);

                    Mail::to('iyanutech20@gmail.com')
                        ->queue(new LowStockAlert($product));
                }
            }
        });
    }
}
