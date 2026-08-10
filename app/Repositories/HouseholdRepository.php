<?php

namespace App\Repositories;

use App\Contracts\HouseholdRepositoryInterface;
use App\Models\Household;
use Illuminate\Database\Eloquent\Collection;

class HouseholdRepository implements HouseholdRepositoryInterface
{
    public function all(): Collection
    {
        return Household::with('members')
            ->latest()
            ->get();
    }

    public function find(int $id): ?Household
    {
        return Household::with('members')
            ->find($id);
    }

    public function create(array $data): Household
    {
        return Household::create($data);
    }

    public function update(
        Household $household,
        array $data
    ): Household {
        $household->update($data);

        return $household->fresh('members');
    }

    public function delete(Household $household): bool
    {
        return $household->delete();
    }
}