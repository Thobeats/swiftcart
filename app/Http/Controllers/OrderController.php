<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function orderSummary(Request $request)
    {
        $user = $request->user();

        $pendingOrders = Order::where(['user_id' => $user->id, 'status' => 'pending'])->count();
        $completedOrders = Order::where(['user_id' => $user->id, 'status' => 'completed'])->count();
        $totalRevenue = Order::where(['user_id' => $user->id])->sum('price');

        $recentOrders = Order::where(['user_id' => $user->id])->latest()->take(5)->get()->map(fn($order) => [
            "orderNo" => $order->order_no,
            "status" => $order->status,
            "price" => $order->price,
            "date" => $order->created_at
        ]);

        return Inertia::render('dashboard', compact('completedOrders', 'pendingOrders', 'recentOrders', 'totalRevenue'));
    }

    public function createOrder(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            "orders" => 'required|array',
            "orders.*.product_id" => 'required|exists:products,id',
            "orders.*.price" => 'required|numeric',
            "orders.*.quantity" => 'required|numeric',
            "total_price" => 'required|numeric'
        ]);

        //// Create Order No
        $orderNo = uniqid('#ORD');

        DB::transaction(function () use ($validated, $orderNo, $user) {
            /// Create Order
            Order::create([
                "order_no" => $orderNo,
                "user_id" => $user->id,
                "price" => $validated['total_price'],
                "status" => collect(['completed', 'pending'])->random()
            ]);

            /// Create Order Items
            $this->createOrderItems($validated['orders'], $orderNo);
        });
        return back()->with('success', "Order created");
    }

    private function createOrderItems(array $orders, string $orderNo)
    {
        OrderItem::insert(
            collect($orders)
                ->map(fn($order) => array('order_no' => $orderNo, 'product_id' => $order['product_id'], 'quantity' => $order['quantity'], 'price' => $order['price'], 'created_at' => now(), 'updated_at' => now()))
                ->toArray()
        );

    }

    public function allOrders(Request $request)
    {
        $user = $request->user();
        $orders = Order::where(['user_id' => $user->id])->latest()->get()->map(fn($order) => [
            "id" => $order->id,
            "orderNo" => $order->order_no,
            "status" => $order->status,
            "price" => $order->price,
            "date" => $order->created_at
        ]);

        return Inertia::render('orders', compact('orders'));
    }

    public function orderDetails(Order $order)
    {
        $orderItems = OrderItem::where('order_no', $order->order_no)
            ->get()
            ->map(fn(OrderItem $item) => [
                "id" => $item->id,
                "product_name" => $item->product->name,
                "quantity" => $item->quantity,
                "price" => $item->price
            ]);

        return response()->json([
            'items' => $orderItems,
            'orderNo' => $order->order_no,
        ]);
    }
}
