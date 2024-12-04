<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NotaMedica;

class NotaMedicaController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->input('search');
        $notas = NotaMedica::with('paciente', 'user')
            ->whereHas('paciente', function ($query) use ($search) {
                $query->where('nombres', 'LIKE', "%$search%")
                    ->orWhere('apellidos', 'LIKE', "%$search%")
                    ->orWhere('cedula', 'LIKE', "%$search%");
            })
            ->orderBy('fecha', 'desc')
            ->paginate(10);

        return Inertia::render('NotasMedicas/Index', [
            'notas' => $notas,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
