<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\UserRoles;
use Inertia\Response;

class UserRoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('user_roles', [
            'user_roles' => UserRoles::all(),
        ]);
    }
}
