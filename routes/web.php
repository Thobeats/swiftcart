<?php

use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;


Route::get('/', [HomeController::class, 'home'])->name('home');

Route::get('/refresh', function () {
    $today = now()->startOfDay();

    $orders = OrderItem::select('product_id', DB::raw('SUM(quantity) as quantity_sold'), DB::raw('SUM(price) as revenue'))
        ->whereDate('created_at', $today)
        ->with('product:id,name')
        ->groupBy('product_id')
        ->get()
        ->map(function (OrderItem $item) {
            return [
                "name" => $item->product->name,
                "quantity_sold" => $item->quantity_sold,
                "revenue" => $item->revenue
            ];
        })
        ->toArray();

    dd($orders);
});

Route::get('/dashboard', [OrderController::class, 'orderSummary'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/orders', [OrderController::class, 'allOrders'])->middleware(['auth', 'verified'])->name('orders');


Route::middleware('auth')->group(function () {

    //// CART ROUTES
    Route::post("/cart/add/{product}", [CartController::class, 'addItemToCart'])->name('add.cart.item');
    Route::delete("/cart/remove/{product}", [CartController::class, 'removeItemFromCart'])->name('remove.cart.item');
    Route::patch("/cart/update/{product}", [CartController::class, 'updateQuantity'])->name('update.cart.item');
    Route::delete("/cart/clear", [CartController::class, 'clearCart'])->name('clear.cart');

    ///// CHECKOUT
    Route::post('/checkout', [OrderController::class, 'createOrder'])->name('order.create');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
