<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('informe_medico', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_paciente');
            $table->unsignedBigInteger('id_user');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->text('apa_sis_circulatorio');
            $table->text('apa_sis_nervioso');
            $table->text('apa_sis_endocrino');
            $table->text('tratamiento_actual');
            $table->text('dieta_nutricion');
            $table->text('presion_arterial');
            $table->text('esfera_funcional');
            $table->text('esfera_mental');
            $table->text('esfera_social');
            $table->text('conclusion');
            $table->text('recomendaciones');
            $table->timestamps();

            $table->foreign('id_paciente')->references('id')->on('pacientes')->onDelete('cascade');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informe_medico');
    }
};
