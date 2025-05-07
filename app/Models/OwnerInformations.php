<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerInformations extends Model
{
    use HasFactory;
    protected $fillable = [
        'owner_of_cargo',
        'city',
        'address',
        'person_in_charge',
        'contact_information',
    ];
}
