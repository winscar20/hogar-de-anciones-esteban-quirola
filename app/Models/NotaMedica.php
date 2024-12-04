<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaMedica extends Model
{
    use HasFactory;
    protected $table = 'notas_medicas';

    protected $fillable = [
        'id_paciente',
        'id_user',
        'fecha',
        'nota_evaluacion',
        'prescripcion_medica'
    ];
    // Define los atributos que son fechas
    protected $casts = [
        'fecha' => 'datetime',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'id_paciente', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
