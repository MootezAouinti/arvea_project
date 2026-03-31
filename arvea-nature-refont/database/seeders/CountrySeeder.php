<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::create([
            'name' => 'Tunisia',
            'currency' => 'TND',
            'status' => 'active',
            'config_type_stock' => 'zone',
            'is_active_for_admin' => true,
        ]);

        Country::create([
            'name' => 'Algeria',
            'currency' => 'DZD',
            'status' => 'active',
            'config_type_stock' => 'global',
            'is_active_for_admin' => true,
        ]);
    }
}
