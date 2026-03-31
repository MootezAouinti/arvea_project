<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Parfum Homme X',
            'slug' => 'parfum-homme-x',
            'sku' => 'PHX001',
            'price' => 49.900,
            'status' => 'active',
            'category_id' => 1,
        ]);
    }
}
