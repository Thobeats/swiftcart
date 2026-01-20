<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Electronics',
            'Accessories',
            'Footwear',
            'Home',
        ];

        foreach ($categories as $name) {
            ProductCategory::updateOrCreate(
                ['name' => $name],
                ['status' => 'active']
            );
        }
    }
}
