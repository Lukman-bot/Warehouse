<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommodityCategories extends Model
{
    use HasFactory;
    protected $fillable = [
        'commodity_category',
        'creator',
    ];
}
