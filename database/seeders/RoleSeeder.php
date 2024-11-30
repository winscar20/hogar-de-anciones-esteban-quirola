<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'SuperAdmin']);
        Role::create(['name' => 'Administrativo']);
        Role::create(['name' => 'Doctor']);
        Role::create(['name' => 'Enfermeria']);
        Role::create(['name' => 'Externo']);

        // Crear el administrador
        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@hogar.com',
            'password' => Hash::make(env('ADMIN_PASSWORD', 'admin123')),
        ]);

        // Asignar el rol de Administrador
        $admin->role()->associate($adminRole);
        $admin->save();
    }
}
