<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\OwnerInformations;
use Illuminate\Http\Request;
use Inertia\Response;

class OwnerInformationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('owner_informations', [
            'owner_informations' => OwnerInformations::all(),
        ]);
    }
}
