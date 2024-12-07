<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformeMedico extends Model
{
    use HasFactory;
    protected $table = 'informe_medico';

    protected $fillable = [
        'id_paciente',
        'id_user',
        'fecha_inicio',
        'fecha_fin',
        'apa_sis_circulatorio',
        'apa_sis_nervioso',
        'apa_sis_endocrino',
        'tratamiento_actual',
        'dieta_nutricion',
        'presion_arterial',
        'esfera_funcional',
        'esfera_mental',
        'esfera_social',
        'conclusion',
        'recomendaciones',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'id_paciente', 'id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
