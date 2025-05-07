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
        Schema::create('user_managements', function (Blueprint $table) {
            $table->id();
            $table->integer('user_number');
            $table->string('user_name');
            $table->string('role');
            $table->string('sex');
            $table->integer('contact_information');
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
