<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Wireless Headphones',
                'price' => 149.99,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                'category' => 'Electronics',
                'description' => 'Premium wireless headphones with noise cancellation',
            ],
            [
                'name' => 'Smart Watch',
                'price' => 299.99,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
                'category' => 'Electronics',
                'description' => 'Feature-rich smartwatch with health tracking',
            ],
            [
                'name' => 'Leather Backpack',
                'price' => 89.99,
                'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
                'category' => 'Accessories',
                'description' => 'Stylish leather backpack for everyday use',
            ],
            [
                'name' => 'Running Shoes',
                'price' => 129.99,
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                'category' => 'Footwear',
                'description' => 'Lightweight running shoes for optimal performance',
            ],
            [
                'name' => 'Minimalist Desk Lamp',
                'price' => 59.99,
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
                'category' => 'Home',
                'description' => 'Modern LED desk lamp with adjustable brightness',
            ],
            [
                'name' => 'Ceramic Coffee Mug',
                'price' => 24.99,
                'image' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
                'category' => 'Home',
                'description' => 'Handcrafted ceramic mug for your morning coffee',
            ],
            [
                'name' => 'Wireless Keyboard',
                'price' => 79.99,
                'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
                'category' => 'Electronics',
                'description' => 'Ergonomic wireless keyboard with backlight',
            ],
            [
                'name' => 'Canvas Tote Bag',
                'price' => 34.99,
                'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
                'category' => 'Accessories',
                'description' => 'Durable canvas tote bag for shopping',
            ],
            [
                'name' => 'Portable Speaker',
                'price' => 69.99,
                'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
                'category' => 'Electronics',
                'description' => 'Compact Bluetooth speaker with rich sound',
            ],
            [
                'name' => 'Sunglasses',
                'price' => 119.99,
                'image' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                'category' => 'Accessories',
                'description' => 'Classic sunglasses with UV protection',
            ],
            [
                'name' => 'Plant Pot Set',
                'price' => 44.99,
                'image' => 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
                'category' => 'Home',
                'description' => 'Set of 3 minimalist ceramic plant pots',
            ],
            [
                'name' => 'Fitness Tracker',
                'price' => 89.99,
                'image' => 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
                'category' => 'Electronics',
                'description' => 'Waterproof fitness tracker with heart rate monitor',
            ],
        ];

        foreach ($products as $p) {
            $category = ProductCategory::where('name', $p['category'])->first();
            if (! $category) {
                continue;
            }

            $data = [
                'name' => $p['name'],
                "price" => $p['price'],
                'description' => $p['description'] ?? '',
                'stock_quantity' => $p['stock_quantity'] ?? 10,
                'category_id' => $category->id,
                'image' => $p['image'] ?? '',
            ];

            Product::updateOrCreate([
                'name' => $p['name'],
            ], $data);
        }
    }
}
