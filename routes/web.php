<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\NotaEnfermeriaController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\RestrictUsersCrud;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        // Redirige al dashboard si está autenticado
        return redirect()->route('dashboard');
    }
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::middleware(RestrictUsersCrud::class)->group(function () {
        Route::resource('/users', UserController::class);
        Route::get('api/users/search', [UserController::class, 'search'])->name('users.search');
    // });

    // Pacientes
    // Route::get('/pacientes', [PacienteController::class, 'index'])->name('pacientes.index');
    Route::resource('/pacientes', PacienteController::class);
    Route::get('api/pacientes/search', [PacienteController::class, 'search'])->name('pacientes.search');
    Route::resource('/notas-enfermeria', NotaEnfermeriaController::class);
});

require __DIR__.'/auth.php';
