<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Parfums',
            'slug' => 'parfums',
            'status' => 'active',
            'position' => 1,
        ]);

        Category::create([
            'name' => 'Soins',
            'slug' => 'soins',
            'status' => 'active',
            'position' => 2,
        ]);
    }
}
