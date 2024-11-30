<?php

namespace App\Http\Controllers;

use App\Models\Paciente;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pacientes = Paciente::with('responsable')
        ->when($search, function ($query, $search) {
            return $query->where('nombres', 'LIKE', "%$search%")
                ->orWhere('apellidos', 'LIKE', "%$search%")
                ->orWhere('cedula', 'LIKE', "%$search%");
        })
        ->paginate(10);
        return Inertia::render('Pacientes/Index', [
            'pacientes' => $pacientes,
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
        return Inertia::render('Pacientes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'cedula' => 'required|string|max:10',
            'estado_civil' => 'required|string|max:255',
            'ocupacion' => 'string|max:255',
            'institucion' => 'string|max:255',
            'responsable' => 'required|numeric',
            'motivo_ingreso' => 'required|string',
            'antecedentes_patologicos' => 'string',
            'enfermedad_actual' => 'required|string',
        ]);
        Paciente::create([
            'nombres' => $validated['nombres'],
            'apellidos' => $validated['apellidos'],
            'cedula' => $validated['cedula'],
            'estado_civil' => $validated['estado_civil'],
            'ocupacion' => $validated['ocupacion'] ?? null,
            'institucion' => $validated['institucion'] ?? null,
            'responsable' => $validated['responsable'],
            'motivo_ingreso' => $validated['motivo_ingreso'],
            'antecedentes_patologicos' => $validated['antecedentes_patologicos'] ?? null,
            'enfermedad_actual' => $validated['enfermedad_actual'],
        ]);
        return redirect()->route('pacientes.index')->with('success', 'Usuario creado exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $paciente = Paciente::with('responsable')->findOrFail($id); // Encuentra el usuario o lanza un error 404

        return Inertia::render('Pacientes/Edit', [
            'paciente' => $paciente
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $paciente = Paciente::findOrFail($id); // Encuentra el usuario o lanza un error 404

        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'cedula' => 'required|string|max:10',
            'estado_civil' => 'required|string|max:255',
            'ocupacion' => 'string|max:255',
            'institucion' => 'string|max:255',
            'responsable' => 'required|numeric',
            'motivo_ingreso' => 'required|string',
            'antecedentes_patologicos' => 'string',
            'enfermedad_actual' => 'required|string',
        ]);

        $paciente->update([
            'nombres' => $validated['nombres'],
            'apellidos' => $validated['apellidos'],
            'cedula' => $validated['cedula'],
            'estado_civil' => $validated['estado_civil'],
            'ocupacion' => $validated['ocupacion'] ?? null,
            'institucion' => $validated['institucion'] ?? null,
            'responsable' => $validated['responsable'],
            'motivo_ingreso' => $validated['motivo_ingreso'],
            'antecedentes_patologicos' => $validated['antecedentes_patologicos'] ?? null,
            'enfermedad_actual' => $validated['enfermedad_actual'],
        ]);

        return redirect()->route('pacientes.index')->with('success', 'Paciente actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $paciente = Paciente::findOrFail($id);
        $paciente->delete();
        return redirect()->route('pacientes.index')->with('success', 'Paciente eliminado exitosamente.');
    }

    public function search(Request $request) {
        $query = $request->input('query');

        $pacientes = Paciente::where('nombres', 'LIKE', "%$query%")
            ->orWhere('apellidos', 'LIKE', "%$query%")
            ->orWhere('cedula', 'LIKE', "%$query%")
            ->get();

        return response()->json($pacientes);
    }

    public function show($id)
    {
        $paciente = Paciente::findOrFail($id);
        return response()->json($paciente);
    }
}
