<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Household extends Model
{
    protected $fillable = [
        'father_name',
        'mother_name',
        'father_occupation',
        'mother_occupation',
        'home_address',
        'family_income',
        'household_status',
        'other_household_status',
    ];

    protected function casts(): array
    {
        return [
            'family_income' => 'decimal:2',
        ];
    }

    public function members(): HasMany
    {
        return $this->hasMany(HouseholdMember::class);
    }
}