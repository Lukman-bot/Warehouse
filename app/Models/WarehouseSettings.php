<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarehouseSettings extends Model
{
    use HasFactory;
    protected $fillable = [
        'warehouse_name',
        'city',
        'address',
        'contact_telephone',
        'email',
        'manager',
        'valid',
    ];
}
