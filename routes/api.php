<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::controller(AuthController::class)->group(function() {
    Route::post('/register', 'register')->name('register');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});

Route::group(['middleware' => 'auth:sanctum'], function() {
//    Route::get('/user', function (Request $request) {
//        return $request->user();
//    });
    Route::controller(UserController::class)->group(function() {
        Route::get('/user', 'singleUser')->name('user.single');
        Route::get('/users', 'userList')->name('user.list');
        Route::post('/user-approved', 'userApproved')->name('user.approved');
    });
    Route::controller(AuthController::class)->group(function() {
        Route::post('/logout', 'logout')->name('logout');
    });
    Route::controller(LeaveController::class)->group(function() {
        Route::get('/leaves', 'leaves')->name('leaves');
        Route::post('/leaves', 'store')->name('leaves-store');
        Route::get('/leave-statuses', 'leaveStatus')->name('leave-status');
        Route::get('/leave-types', 'leaveTypes')->name('leave-types');
    });
});
