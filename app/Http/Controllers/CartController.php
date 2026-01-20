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

        ///Find the Cart Item
        $cart = Cart::where(['product_id' => $product->id, "user_id" => $request->user()->id])->first();

        if ($cart) {
            $cart->increment('quantity');
        } else {
            $cart = Cart::create([
                'product_id' => $product->id,
                'quantity' => 1,
                'user_id' => $request->user()->id
            ]);
        }

        return back()->with('success', array_merge(
            $cart->product->only(
                'id',
                'name',
                'price',
                'description',
                'image'
            ),
            ['quantity' => $cart->quantity]
        ));
    }

    public function removeItemFromCart(Request $request, Product $product)
    {
        ///Find the Cart Item
        $cart = Cart::where(['product_id' => $product->id, "user_id" => $request->user()->id])->first();

        if (!$cart)
            return back()->with('error', 'Cart Item not found');

        $cart->delete();

        return back()->with('success', 'cart item deleted');
    }

    public function updateQuantity(Request $request, Product $product)
    {
        ///Find the Cart Item
        $cart = Cart::where(['product_id' => $product->id, "user_id" => $request->user()->id])->first();

        if (!$cart)
            return back()->with('error', 'Cart Item not found');

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

        return back()->with('success', 'Cart Item Updated');
    }

    public function clearCart(Request $request)
    {
        Cart::where('user_id', $request->user()->id)->delete();
        return back()->with('success', 'Cart Item Updated');
    }
}
