<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssignRolesToUsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $userRole = Role::where('name', 'client')->first();

        if ($adminRole) {
            $admin = User::where('email', 'admin@gmail.com')->first();

            if ($admin) {
                $admin->update([
                    'role_id' => $adminRole->id,
                ]);
            }
        }

        if ($userRole) {
            User::whereNull('role_id')
                ->where('email', '!=', 'admin@gmail.com')
                ->update([
                    'role_id' => $userRole->id,
                ]);
        }
    }
}