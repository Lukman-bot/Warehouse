<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\WarehouseSettings;
use Illuminate\Http\Request;
use Inertia\Response;

class WarehouseSettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('warehouse_settings', [
            'warehouse_settings' => WarehouseSettings::all(),
        ]);
    }

}
