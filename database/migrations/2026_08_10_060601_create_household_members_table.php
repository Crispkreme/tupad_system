<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('household_members', function (Blueprint $table) {
            $table->id();

            $table->foreignId('household_id')
                ->constrained('households')
                ->cascadeOnDelete();

            $table->string('name');

            $table->date('birth_date');

            $table->enum('sex', [
                'male',
                'female',
                'other',
            ]);

            $table->enum('civil_status', [
                'single',
                'married',
                'widowed',
                'separated',
                'divorced',
                'other',
            ])->default('single');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('household_members');
    }
};