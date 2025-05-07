<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\UserManagements;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('user_managements', [
            'user_managements' => UserManagements::all(),
        ]);
    }
}
