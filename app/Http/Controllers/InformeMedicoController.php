<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InformeMedico;
use Inertia\Inertia;

class InformeMedicoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $informes = InformeMedico::with('paciente', 'user')
            ->whereHas('paciente', function ($query) use ($search) {
                $query->where('nombres', 'LIKE', "%$search%")
                    ->orWhere('apellidos', 'LIKE', "%$search%")
                    ->orWhere('cedula', 'LIKE', "%$search%");
            })
            ->orderBy('updated_at', 'desc')
            ->paginate(10);

        return Inertia::render('InformeMedico/Index', [
            'informes' => $informes,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
