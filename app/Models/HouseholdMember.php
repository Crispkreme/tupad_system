<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HouseholdMember extends Model
{
    protected $fillable = [
        'household_id',
        'name',
        'birth_date',
        'sex',
        'civil_status',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
        ];
    }

    protected $appends = [
        'age',
    ];

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function getAgeAttribute(): int
    {
        return $this->birth_date
            ? $this->birth_date->age
            : 0;
    }
}