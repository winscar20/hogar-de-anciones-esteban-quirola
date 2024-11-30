<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RestrictUsersCrud
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Veriicamos que el usuario  sea externo
        // dd($user->role->name);
        if ($user && !in_array($user->role->name, ['Administrativo', 'SuperAdmin'])) {
            return response()->view('403', [], 403);
        }
        return $next($request);
    }
}
