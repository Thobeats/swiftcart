<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addItemToCart(Request $request, Product $product)
    {
        /// Check if the product is in stock
        if ($product->stock_quantity < 1) {
            return redirect()->back()->withErrors([
                'cartError' => 'Product is out of stock'
            ]);
        }

        ///Save the Cart Item
        $cart = Cart::where(['product_id' => $product->id, "user_id" => $request->user()->id])->first();

        if ($cart) {
            $cart->increment('quantity');
        } else {
            Cart::create([
                'product_id' => $product->id,
                'quantity' => 1,
                'user_id' => $request->user()->id
            ]);
        }

        return;
    }

    public function updateQuantity(Request $request, Cart $cart)
    {
        $validated = $request->validate([
            "action" => 'required|in:add,sub'
        ]);

        if ($validated['action'] == 'add') {
            $cart->increment('quantity', 1);
        } else {
            $cart->decrement('quantity', 1);

            if ($cart->quantity == 0) {
                $cart->delete();
            }
        }

        return;
    }

    public function deleteCart(Request $request, Cart $cart)
    {
        if ($cart->user_id == $request->user()->id)
            $cart->delete();

        return;
    }
}
