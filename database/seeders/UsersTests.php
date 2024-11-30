<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;

class UsersTests extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::where('name', '!=', 'SuperAdmin')->get();

        if ($roles->isEmpty()) {
            $this->command->error('No valid roles found in the database. Please ensure there are roles other than SuperAdmin.');
            return;
        }

        $usersCount = rand(40, 55);

        User::factory()
            ->count($usersCount)
            ->create()
            ->each(function ($user) use ($roles) {
                $randomRole = $roles->random();
                $user->role_id = $randomRole->id;
                $user->password = Hash::make('open$123');
                $user->save();
            });

        $this->command->info("$usersCount users have been created successfully.");
    }
}
