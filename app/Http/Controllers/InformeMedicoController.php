<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InformeMedico;
use Inertia\Inertia;
use Carbon\Carbon;

class InformeMedicoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $informes = InformeMedico::with('paciente', 'doctor')
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
        return Inertia::render('InformeMedico/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'paciente' => 'required|exists:pacientes,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'apa_sis_circulatorio' => 'string',
            'apa_sis_nervioso' => 'string',
            'apa_sis_endocrino' => 'string',
            'tratamiento_actual' => 'string',
            'dieta_nutricion' => 'string',
            'presion_arterial' => 'string',
            'esfera_funcional' => 'string',
            'esfera_mental' => 'string',
            'esfera_social' => 'string',
            'conclusion' => 'string',
            'recomendaciones' => 'string',
            'doctor' => 'required|numeric',
            'redirect' => 'nullable|string',
        ]);

        $validate['fecha_inicio'] = Carbon::parse($validate['fecha_inicio'])->format('Y-m-d');
        $validate['fecha_fin'] = Carbon::parse($validate['fecha_fin'])->format('Y-m-d');

        InformeMedico::create([
            'id_paciente' => $validate['paciente'],
            'fecha_inicio' => $validate['fecha_inicio'],
            'fecha_fin' => $validate['fecha_fin'],
            'apa_sis_circulatorio' => $validate['apa_sis_circulatorio'],
            'apa_sis_nervioso' => $validate['apa_sis_nervioso'],
            'apa_sis_endocrino' => $validate['apa_sis_endocrino'],
            'tratamiento_actual' => $validate['tratamiento_actual'],
            'dieta_nutricion' => $validate['dieta_nutricion'],
            'presion_arterial' => $validate['presion_arterial'],
            'esfera_funcional' => $validate['esfera_funcional'],
            'esfera_mental' => $validate['esfera_mental'],
            'esfera_social' => $validate['esfera_social'],
            'conclusion' => $validate['conclusion'],
            'recomendaciones' => $validate['recomendaciones'],
            'id_user' => $validate['doctor'],
        ]);
        if (array_key_exists('redirect', $validate) && $validate['redirect']) {
            return redirect()->route($validate['redirect'])->with('success', 'Informe Médico creado correctamente');
        }
        return redirect()->route('informes-medicos.index')->with('success', 'Informe Médico creado correctamente');
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
        $informe_medico = InformeMedico::findOrFail($id);
        $informe_medico->delete();
        return redirect()->route('informes-medicos.index')->with('success', 'Informe Médico eliminado exitosamente.');
    }
}
