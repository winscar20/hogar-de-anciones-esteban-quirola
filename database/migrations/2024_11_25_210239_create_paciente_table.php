<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('cedula')->unique();
            $table->string('estado_civil');
            $table->string('ocupacion')->nullable();
            $table->string('institucion')->nullable();
            $table->unsignedBigInteger('responsable');
            $table->foreign('responsable')->references('id')->on('users')->onDelete('cascade');
            $table->text('motivo_ingreso');
            $table->text('antecedentes_patologicos')->nullable();
            $table->text('enfermedad_actual');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
