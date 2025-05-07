<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserManagements extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_number',
        'user_name',
        'role',
        'sex',
        'contact_information',
        'valid',
    ];
}
