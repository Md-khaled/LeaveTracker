<?php
use App\Http\Controllers\Admin\AuthController;



Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});
