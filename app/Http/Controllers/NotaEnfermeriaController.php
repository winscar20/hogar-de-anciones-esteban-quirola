<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NotaEnfermeria;
use Illuminate\Validation\Rules;
use Carbon\Carbon;

class NotaEnfermeriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $notas = NotaEnfermeria::with('paciente', 'user')
            ->whereHas('paciente', function ($query) use ($search) {
                $query->where('nombres', 'LIKE', "%$search%")
                    ->orWhere('apellidos', 'LIKE', "%$search%")
                    ->orWhere('cedula', 'LIKE', "%$search%");
            })
            ->orderBy('fecha', 'desc')
            ->paginate(10);

        return Inertia::render('NotasEnfermeria/Index', [
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
        return Inertia::render('NotasEnfermeria/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'paciente' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nota' => 'required|string',
            'user' => 'required|numeric',
        ]);
        $validate['fecha'] = Carbon::parse($validate['fecha'])->format('Y-m-d H:i:s');

        NotaEnfermeria::create([
            'id_paciente' => $validate['paciente'],
            'fecha' => $validate['fecha'],
            'nota' => $validate['nota'],
            'id_user' => $validate['user'],
        ]);
        return redirect()->route('notas-enfermeria.index')->with('success', 'Nota de enfermería creada correctamente');
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
        $nota_enfermeria = NotaEnfermeria::with('paciente')->with('user')->findOrFail($id);
        $nota_enfermeria->fecha = $nota_enfermeria->fecha
        ? $nota_enfermeria->fecha->format('Y-m-d\TH:i:s')
        : null;

        return Inertia::render('NotasEnfermeria/Edit', [
            'nota' => $nota_enfermeria
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $nota = NotaEnfermeria::findOrFail($id);

        $validate = $request->validate([
            'paciente' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nota' => 'required|string',
            'user' => 'required|numeric',
        ]);
        $validate['fecha'] = Carbon::parse($validate['fecha'])->format('Y-m-d H:i:s');

        $nota->update([
            'id_paciente' => $validate['paciente'],
            'fecha' => $validate['fecha'],
            'nota' => $validate['nota'],
            'id_user' => $validate['user'],
        ]);

        return redirect()->route('notas-enfermeria.index')->with('success', 'Nota de enfermería actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $nota = NotaEnfermeria::findOrFail($id);
        $nota->delete();
        return redirect()->route('notas-enfermeria.index')->with('success', 'Nota de Enfermeria eliminada!');
    }
}
