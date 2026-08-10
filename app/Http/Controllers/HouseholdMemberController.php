<?php

namespace App\Http\Controllers;

use App\Models\Household;
use App\Models\HouseholdMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HouseholdMemberController extends Controller
{
    public function store(
        Request $request,
        Household $household
    ): JsonResponse {
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            'birth_date' => [
                'required',
                'date',
                'before_or_equal:today',
            ],

            'sex' => [
                'required',
                'in:male,female,other',
            ],

            'civil_status' => [
                'required',
                'in:single,married,widowed,separated,divorced,other',
            ],
        ]);

        $member = $household->members()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Household member added successfully.',
            'data' => $member,
        ], 201);
    }

    public function show(
        Household $household,
        HouseholdMember $member
    ): JsonResponse {
        if ($member->household_id !== $household->id) {
            return response()->json([
                'success' => false,
                'message' => 'Member does not belong to this household.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $member,
        ]);
    }

    public function update(
        Request $request,
        Household $household,
        HouseholdMember $member
    ): JsonResponse {
        if ($member->household_id !== $household->id) {
            return response()->json([
                'success' => false,
                'message' => 'Member does not belong to this household.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',

            'birth_date' => [
                'required',
                'date',
                'before_or_equal:today',
            ],

            'sex' => 'required|in:male,female,other',

            'civil_status' => [
                'required',
                'in:single,married,widowed,separated,divorced,other',
            ],
        ]);

        $member->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Household member updated successfully.',
            'data' => $member->fresh(),
        ]);
    }

    public function destroy(
        Household $household,
        HouseholdMember $member
    ): JsonResponse {
        if ($member->household_id !== $household->id) {
            return response()->json([
                'success' => false,
                'message' => 'Member does not belong to this household.',
            ], 404);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Household member deleted successfully.',
        ]);
    }
}