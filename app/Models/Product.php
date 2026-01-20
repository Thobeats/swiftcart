<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "name",
        "price",
        "stock_quantity",
        "image",
        "category_id",
        "description"
    ];

    public function category() {
        return $this->belongsTo(ProductCategory::class, 'category_id', 'id');
    }
}
