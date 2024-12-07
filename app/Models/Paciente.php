<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;
    protected $table = 'pacientes';

    protected $fillable = [
        'nombres',
        'apellidos',
        'cedula',
        'estado_civil',
        'ocupacion',
        'telefono',
        'responsable',
        'motivo_ingreso',
        'antecedentes_patologicos',
        'enfermedad_actual',
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable', 'id');
    }

    public function notasEnfermeria() {
        return $this->hasMany(NotaEnfermeria::class, 'id_paciente', 'id');
    }

    public function notasMedicas() {
        return $this->hasMany(NotaMedica::class, 'id_paciente', 'id');
    }
    public function informesMedicos() {
        return $this->hasMany(InformeMedico::class, 'id_paciente', 'id');
    }

    public function setTelefonoAttribute($value)
    {
        $this->attributes['telefono'] = preg_replace('/[^0-9]/', '', $value);
    }
}
