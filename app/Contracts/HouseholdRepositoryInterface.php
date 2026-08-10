<?php

namespace App\Contracts;

use App\Models\Household;
use Illuminate\Database\Eloquent\Collection;

interface HouseholdRepositoryInterface
{
    public function all(): Collection;

    public function find(int $id): ?Household;

    public function create(array $data): Household;

    public function update(Household $household, array $data): Household;

    public function delete(Household $household): bool;
}