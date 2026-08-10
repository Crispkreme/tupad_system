<?php

namespace App\Http\Controllers;

use App\Contracts\HouseholdRepositoryInterface;
use App\Models\Household;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HouseholdController extends Controller
{
    public function __construct(
        private HouseholdRepositoryInterface $repository
    ) {}

    public function index(): JsonResponse
    {
        $households = $this->repository->all();

        return response()->json([
            'success' => true,
            'data' => $households,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',

            'father_occupation' => 'nullable|string|max:255',
            'mother_occupation' => 'nullable|string|max:255',

            'home_address' => 'required|string',

            'family_income' => 'required|numeric|min:0',

            'household_status' => [
                'required',
                'in:rent,living_with_parent_or_relatives,owned,other',
            ],

            'other_household_status' => [
                'nullable',
                'required_if:household_status,other',
                'string',
                'max:255',
            ],
        ]);

        $household = $this->repository->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Household created successfully.',
            'data' => $household,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $household = $this->repository->find($id);

        if (!$household) {
            return response()->json([
                'success' => false,
                'message' => 'Household not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $household,
        ]);
    }

    public function update(
        Request $request,
        Household $household
    ): JsonResponse {
        $validated = $request->validate([
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',

            'father_occupation' => 'nullable|string|max:255',
            'mother_occupation' => 'nullable|string|max:255',

            'home_address' => 'required|string',

            'family_income' => 'required|numeric|min:0',

            'household_status' => [
                'required',
                'in:rent,living_with_parent_or_relatives,owned,other',
            ],

            'other_household_status' => [
                'nullable',
                'required_if:household_status,other',
                'string',
                'max:255',
            ],
        ]);

        $household = $this->repository->update(
            $household,
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Household updated successfully.',
            'data' => $household,
        ]);
    }

    public function destroy(Household $household): JsonResponse
    {
        $this->repository->delete($household);

        return response()->json([
            'success' => true,
            'message' => 'Household deleted successfully.',
        ]);
    }
}