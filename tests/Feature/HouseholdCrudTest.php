<?php

namespace Tests\Feature;

use App\Models\Household;
use App\Models\HouseholdMember;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HouseholdCrudTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test complete Household + Member CRUD.
     */
    public function test_household_and_member_crud(): void
    {
        /*
        |--------------------------------------------------------------------------
        | 1. CREATE HOUSEHOLD
        |--------------------------------------------------------------------------
        */

        $householdData = [
            'father_name' => 'Juan Test',
            'mother_name' => 'Maria Test',
            'father_occupation' => 'Farmer',
            'mother_occupation' => 'Vendor',
            'home_address' => 'Test Address, General Santos City',
            'family_income' => 25000,
            'household_status' => 'owned',
        ];

        $response = $this->postJson(
            '/api/households',
            $householdData
        );

        $response
            ->assertStatus(201)
            ->assertJsonPath(
                'data.father_name',
                'Juan Test'
            )
            ->assertJsonPath(
                'data.mother_name',
                'Maria Test'
            );

        $householdId = $response->json('data.id');

        $this->assertNotNull($householdId);

        $this->assertDatabaseHas('households', [
            'id' => $householdId,
            'father_name' => 'Juan Test',
            'mother_name' => 'Maria Test',
        ]);

        /*
        |--------------------------------------------------------------------------
        | 2. GET ALL HOUSEHOLDS
        |--------------------------------------------------------------------------
        */

        $response = $this->getJson('/api/households');

        $response
            ->assertOk()
            ->assertJsonPath('success', true);

        /*
        |--------------------------------------------------------------------------
        | 3. GET SINGLE HOUSEHOLD
        |--------------------------------------------------------------------------
        */

        $response = $this->getJson(
            "/api/households/{$householdId}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.id',
                $householdId
            )
            ->assertJsonPath(
                'data.father_name',
                'Juan Test'
            );

        /*
        |--------------------------------------------------------------------------
        | 4. UPDATE HOUSEHOLD
        |--------------------------------------------------------------------------
        */

        $updatedHousehold = [
            'father_name' => 'Juan Updated',
            'mother_name' => 'Maria Updated',
            'father_occupation' => 'Engineer',
            'mother_occupation' => 'Teacher',
            'home_address' => 'Updated Address',
            'family_income' => 35000,
            'household_status' => 'rent',
        ];

        $response = $this->putJson(
            "/api/households/{$householdId}",
            $updatedHousehold
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.father_name',
                'Juan Updated'
            )
            ->assertJsonPath(
                'data.family_income',
                '35000.00'
            );

        $this->assertDatabaseHas('households', [
            'id' => $householdId,
            'father_name' => 'Juan Updated',
            'family_income' => 35000,
        ]);

        /*
        |--------------------------------------------------------------------------
        | 5. CREATE HOUSEHOLD MEMBER
        |--------------------------------------------------------------------------
        */

        $memberData = [
            'name' => 'Pedro Test',
            'birth_date' => '2015-05-10',
            'sex' => 'male',
            'civil_status' => 'single',
        ];

        $response = $this->postJson(
            "/api/households/{$householdId}/members",
            $memberData
        );

        $response
            ->assertStatus(201)
            ->assertJsonPath(
                'data.name',
                'Pedro Test'
            )
            ->assertJsonPath(
                'data.household_id',
                $householdId
            );

        $memberId = $response->json('data.id');

        $this->assertNotNull($memberId);

        $this->assertDatabaseHas('household_members', [
            'id' => $memberId,
            'household_id' => $householdId,
            'name' => 'Pedro Test',
        ]);

        /*
        |--------------------------------------------------------------------------
        | 6. GET HOUSEHOLD WITH MEMBER
        |--------------------------------------------------------------------------
        */

        $response = $this->getJson(
            "/api/households/{$householdId}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.id',
                $householdId
            )
            ->assertJsonCount(
                1,
                'data.members'
            );

        /*
        |--------------------------------------------------------------------------
        | 7. GET SINGLE MEMBER
        |--------------------------------------------------------------------------
        */

        $response = $this->getJson(
            "/api/households/{$householdId}/members/{$memberId}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.id',
                $memberId
            )
            ->assertJsonPath(
                'data.name',
                'Pedro Test'
            );

        /*
        |--------------------------------------------------------------------------
        | 8. UPDATE MEMBER
        |--------------------------------------------------------------------------
        */

        $updatedMember = [
            'name' => 'Pedro Updated',
            'birth_date' => '2014-05-10',
            'sex' => 'male',
            'civil_status' => 'single',
        ];

        $response = $this->putJson(
            "/api/households/{$householdId}/members/{$memberId}",
            $updatedMember
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.name',
                'Pedro Updated'
            );

        $this->assertDatabaseHas('household_members', [
            'id' => $memberId,
            'name' => 'Pedro Updated',
        ]);

        /*
        |--------------------------------------------------------------------------
        | 9. DELETE MEMBER
        |--------------------------------------------------------------------------
        */

        $response = $this->deleteJson(
            "/api/households/{$householdId}/members/{$memberId}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            );

        $this->assertDatabaseMissing('household_members', [
            'id' => $memberId,
        ]);

        /*
        |--------------------------------------------------------------------------
        | 10. DELETE HOUSEHOLD
        |--------------------------------------------------------------------------
        */

        $response = $this->deleteJson(
            "/api/households/{$householdId}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            );

        $this->assertDatabaseMissing('households', [
            'id' => $householdId,
        ]);
    }
}