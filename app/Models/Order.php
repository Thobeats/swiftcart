<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        "order_no",
        "user_id",
        "price",
        "status"
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_no', 'order_no');
    }
}
