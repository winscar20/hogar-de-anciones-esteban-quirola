<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaEnfermeria extends Model
{
    use HasFactory;
    protected $table = 'notas_de_enfermeria';

    protected $fillable = [
        'id_paciente',
        'id_user',
        'fecha',
        'nota',
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
