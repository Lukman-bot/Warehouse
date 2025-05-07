<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreightSettings extends Model
{
    use HasFactory;
    protected $fillable = [
        'carrier',
        'departure_city',
        'arrival_city',
        'weight_fee',
        'volume_fee',
        'minimal_payment',
        'creator',
        'valid'
    ];
}
