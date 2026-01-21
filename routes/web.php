<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;


Route::get('/', [HomeController::class, 'home'])->name('home');



Route::middleware(['auth', 'verified'])->group(function () {

    //// CART ROUTES
    Route::post("/cart/add/{product}", [CartController::class, 'addItemToCart'])->name('add.cart.item');
    Route::delete("/cart/remove/{product}", [CartController::class, 'removeItemFromCart'])->name('remove.cart.item');
    Route::patch("/cart/update/{product}", [CartController::class, 'updateQuantity'])->name('update.cart.item');
    Route::delete("/cart/clear", [CartController::class, 'clearCart'])->name('clear.cart');

    ///// CHECKOUT
    Route::post('/checkout', [OrderController::class, 'createOrder'])->name('order.create');

    //// DASHBOARD
    Route::get('/dashboard', [OrderController::class, 'orderSummary'])->name('dashboard');
    Route::get('/orders', [OrderController::class, 'allOrders'])->name('orders');
    Route::get('/orders/detail/{order}', [OrderController::class, 'orderDetails'])->name('orders.detail');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
