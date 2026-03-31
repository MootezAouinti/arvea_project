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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('currency', 10)->nullable();

            $table->unsignedBigInteger('default_language_id')->nullable();

            $table->string('status')->default('active');
            $table->string('config_type_stock')->nullable();

            $table->boolean('is_active_for_admin')->default(true);

            $table->string('domain')->nullable();
            $table->string('main_domain')->nullable();

            $table->timestamps();

            $table->index('name');
            $table->index('status');
            $table->index('is_active_for_admin');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
