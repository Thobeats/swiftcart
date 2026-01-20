<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home(Request $request)
    {
        $user = $request->user();

        $products = Product::select('id', 'name', 'image', 'description', 'price', 'stock_quantity', 'created_at', 'category_id')
            ->orderBy('created_at')
            ->limit(50)
            ->get()
            ->map(function (Product $product) {
                return [
                    "id" => $product->id,
                    "category" => $product->category()->first()->name,
                    "name" => $product->name,
                    "description" => $product->description,
                    "price" => $product->price,
                    "image" => $product->image,
                    "stock_quantity" => $product->stock_quantity,
                    "created_at" => $product->created_at
                ];
            });


        $categories = ProductCategory::where('status', 'active')->select('id', 'name')->orderBy('name')->get();

        return Inertia::render('home', [
            "auth" => $user ? $user : false,
            "products" => $products,
            "categories" => $categories
        ]);
    }

}
