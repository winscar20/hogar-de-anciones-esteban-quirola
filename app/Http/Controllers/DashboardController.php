<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InformeMedico;
use App\Models\NotaEnfermeria;
use App\Models\NotaMedica;
use App\Models\Paciente;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $loggedUser = Auth::user();
        if (auth()->user()->hasRole('Externo')) {
            $pacientes = Paciente::with('notasEnfermeria', 'notasMedicas', 'informesMedicos')
            ->where('responsable', $loggedUser->id)
            ->get();
            return Inertia::render('DashboardExterno', [
                'pacientes' => $pacientes
            ]);
        }else{
            $total_informes = InformeMedico::count();
            $total_notas_enfermeria = NotaEnfermeria::count();
            $total_notas_medicas = NotaMedica::count();
            $total_pacientes = Paciente::count();
            $total_usuarios = User::count();
            return Inertia::render('Dashboard', [
                'stats' => [
                    'total_informes' => $total_informes,
                    'total_notas_enfermeria' => $total_notas_enfermeria,
                    'total_notas_medicas' => $total_notas_medicas,
                    'total_pacientes' => $total_pacientes,
                    'total_usuarios' => $total_usuarios
                ]
            ]);
        }
    }
}
