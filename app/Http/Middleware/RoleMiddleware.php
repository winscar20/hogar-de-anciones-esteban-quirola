<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{

    public function handle(Request $request, Closure $next, ...$roles)
    {
        if ($request->is('/')) {
            return $next($request);
        }
        if (!auth()->check()) {
            abort(403, 'No tienes acceso a esta sección.');
        }

        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (!in_array(auth()->user()->role->name, $roles)) {
            abort(403, 'No tienes acceso a esta sección.');
        }

        return $next($request);
    }
}
