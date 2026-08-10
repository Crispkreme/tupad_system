<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('households', function (Blueprint $table) {
            $table->id();

            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();

            $table->string('father_occupation')->nullable();
            $table->string('mother_occupation')->nullable();

            $table->text('home_address');

            $table->decimal('family_income', 12, 2)->default(0);

            $table->enum('household_status', [
                'rent',
                'living_with_parent_or_relatives',
                'owned',
                'other',
            ])->default('other');

            $table->string('other_household_status')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('households');
    }
};