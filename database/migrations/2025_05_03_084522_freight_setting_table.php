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
        Schema::create('freight_settings', function (Blueprint $table) {
            $table->id();
            $table->string('carrier');
            $table->string('departure_city');
            $table->string('arrival_city');
            $table->integer('weight_fee');
            $table->integer('volume_fee');
            $table->integer('minimal_payment');
            $table->string('creator');
            $table->string('valid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
