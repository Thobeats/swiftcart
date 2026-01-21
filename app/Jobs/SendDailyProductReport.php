<?php

namespace App\Jobs;

use App\Models\OrderItem;
use App\Mail\DailySalesReport;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendDailyProductReport implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct() {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $today = now()->startOfDay();

        $report = OrderItem::select('product_id', DB::raw('SUM(quantity) as quantity_sold'), DB::raw('SUM(price) as revenue'))
                            ->whereDate('created_at', $today)
                            ->with('product:id,name')
                            ->groupBy('product_id')
                            ->get()
                            ->map(function(OrderItem $item) {
                                return [
                                    "name" => $item->product->name,
                                    "quantity_sold" => $item->quantity_sold,
                                    "revenue" => $item->revenue
                                ];
                            })
                            ->toArray();

        Mail::to('iyanutech20@gmail.com')->queue(new DailySalesReport($report));
    }
}
