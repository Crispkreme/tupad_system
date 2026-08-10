<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\HouseholdMemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected API
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Households
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'households',
        HouseholdController::class
    );

    /*
    |--------------------------------------------------------------------------
    | Household Members
    |--------------------------------------------------------------------------
    */

    Route::prefix('households/{household}')->group(function () {

        Route::post(
            'members',
            [HouseholdMemberController::class, 'store']
        );

        Route::get(
            'members/{member}',
            [HouseholdMemberController::class, 'show']
        );

        Route::put(
            'members/{member}',
            [HouseholdMemberController::class, 'update']
        );

        Route::delete(
            'members/{member}',
            [HouseholdMemberController::class, 'destroy']
        );
    });
});