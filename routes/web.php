<?php

use App\Http\Controllers\CompanyInformationController;
use App\Http\Controllers\CommodityCategoryController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RoleMenuSettingsController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\OwnerInformationController;
use App\Http\Controllers\WarehouseSettingController;
use App\Http\Controllers\FreightSettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Basic Settings
Route::resource('c_info', CompanyInformationController::class)->middleware('auth');
Route::resource('user_roles', UserRoleController::class)->middleware('auth');
Route::resource('role_menu_settings', RoleMenuSettingsController::class)->middleware('auth');
Route::resource('user_managements', UserManagementController::class)->middleware('auth');
Route::resource('commodity_categories', CommodityCategoryController::class)->middleware('auth');
Route::resource('owner_informations', OwnerInformationController::class)->middleware('auth');
Route::resource('warehouse_settings', WarehouseSettingController::class)->middleware('auth');
Route::resource('freight_settings', FreightSettingController::class)->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
