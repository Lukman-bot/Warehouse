<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\FreightSettings;
use Illuminate\Http\Request;
use Inertia\Response;


class FreightSettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('freight_settings', [
            'freight_settings' => FreightSettings::all(),
        ]);
    }
}
