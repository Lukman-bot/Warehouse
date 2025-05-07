<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CommodityCategories;
use Inertia\Response;

class CommodityCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('commodity_categories', [
            'commodity_categories' => CommodityCategories::all(),
        ]);
    }
}
