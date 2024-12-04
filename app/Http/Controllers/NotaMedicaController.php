<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NotaMedica;
use Carbon\Carbon;

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
            ->orderBy('updated_at', 'desc')
            ->paginate(10);

        return Inertia::render('NotasMedicas/Index', [
            'notas' => $notas,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('NotasMedicas/Create');
    }

    public function store(Request $request)
    {

        $validate = $request->validate([
            'paciente' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nota_evaluacion' => 'required|string',
            'prescripcion_medica' => 'required|string',
            'user' => 'required|numeric',
            'redirect' => 'nullable|string',
        ]);
        $validate['fecha'] = Carbon::parse($validate['fecha'])->format('Y-m-d H:i:s');

        NotaMedica::create([
            'id_paciente' => $validate['paciente'],
            'fecha' => $validate['fecha'],
            'nota_evaluacion' => $validate['nota_evaluacion'],
            'prescripcion_medica' => $validate['prescripcion_medica'],
            'id_user' => $validate['user'],
        ]);
        
        if (array_key_exists('redirect', $validate) && $validate['redirect']) {
            return redirect()->route($validate['redirect'])->with('success', 'Nota Médica creada correctamente');
        }
        return redirect()->route('notas-medicas.index')->with('success', 'Nota Médica creada correctamente');
    }

    public function edit(string $id)
    {
        $nota_medica = NotaMedica::with('paciente')->with('user')->findOrFail($id);
        $nota_medica->fecha = $nota_medica->fecha
        ? $nota_medica->fecha->format('Y-m-d\TH:i:s')
        : null;

        return Inertia::render('NotasMedicas/Edit', [
            'nota' => $nota_medica
        ]);
    }

    public function update(Request $request, string $id)
    {
        $nota = NotaMedica::findOrFail($id);

        $validate = $request->validate([
            'paciente' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nota_evaluacion' => 'required|string',
            'prescripcion_medica' => 'required|string',
            'user' => 'required|numeric',
        ]);
        $validate['fecha'] = Carbon::parse($validate['fecha'])->format('Y-m-d H:i:s');

        $nota->update([
            'id_paciente' => $validate['paciente'],
            'fecha' => $validate['fecha'],
            'nota_evaluacion' => $validate['nota_evaluacion'],
            'prescripcion_medica' => $validate['prescripcion_medica'],
            'id_user' => $validate['user'],
        ]);

        return redirect()->route('notas-medicas.index')->with('success', 'Nota Médica actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $nota = NotaMedica::findOrFail($id);
        $nota->delete();
        return redirect()->route('notas-medicas.index')->with('success', 'Nota Médica eliminada!');
    }
}
