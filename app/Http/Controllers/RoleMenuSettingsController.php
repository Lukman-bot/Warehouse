<?php

namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\RoleMenuSettings;
use Illuminate\Http\Request;
use Inertia\Response;

class RoleMenuSettingsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('role_menu_settings', [
            'role_menu_settings' => RoleMenuSettings::all(),
        ]);
    }
}
