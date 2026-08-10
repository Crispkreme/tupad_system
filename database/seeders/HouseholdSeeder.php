<?php

namespace Database\Seeders;

use App\Models\Household;
use Illuminate\Database\Seeder;

class HouseholdSeeder extends Seeder
{
    public function run(): void
    {
        $households = [
            [
                'father_name' => 'Juan Dela Cruz',
                'mother_name' => 'Maria Dela Cruz',
                'father_occupation' => 'Farmer',
                'mother_occupation' => 'Vendor',
                'home_address' => 'Barangay San Isidro, General Santos City',
                'family_income' => 25000,
                'household_status' => 'owned',
            ],
            [
                'father_name' => 'Pedro Santos',
                'mother_name' => 'Ana Santos',
                'father_occupation' => 'Driver',
                'mother_occupation' => 'Housekeeper',
                'home_address' => 'Barangay Lagao, General Santos City',
                'family_income' => 18000,
                'household_status' => 'rent',
            ],
            [
                'father_name' => 'Ramon Garcia',
                'mother_name' => 'Elena Garcia',
                'father_occupation' => 'Construction Worker',
                'mother_occupation' => 'Sari-sari Store Owner',
                'home_address' => 'Barangay Calumpang, General Santos City',
                'family_income' => 22000,
                'household_status' => 'living_with_parent_or_relatives',
            ],
            [
                'father_name' => 'Jose Reyes',
                'mother_name' => 'Lorna Reyes',
                'father_occupation' => 'Fisherman',
                'mother_occupation' => 'Vendor',
                'home_address' => 'Barangay Bula, General Santos City',
                'family_income' => 15000,
                'household_status' => 'other',
                'other_household_status' => 'Temporary housing',
            ],
        ];

        foreach ($households as $householdData) {

            $household = Household::create($householdData);

            $household->members()->createMany(
                match ($household->id % 4) {
                    1 => [
                        [
                            'name' => 'Pedro Dela Cruz',
                            'birth_date' => '2015-05-10',
                            'sex' => 'male',
                            'civil_status' => 'single',
                        ],
                        [
                            'name' => 'Ana Dela Cruz',
                            'birth_date' => '2018-09-20',
                            'sex' => 'female',
                            'civil_status' => 'single',
                        ],
                    ],

                    2 => [
                        [
                            'name' => 'Mark Santos',
                            'birth_date' => '2012-03-15',
                            'sex' => 'male',
                            'civil_status' => 'single',
                        ],
                        [
                            'name' => 'Sofia Santos',
                            'birth_date' => '2017-11-02',
                            'sex' => 'female',
                            'civil_status' => 'single',
                        ],
                        [
                            'name' => 'Carlo Santos',
                            'birth_date' => '2005-08-12',
                            'sex' => 'male',
                            'civil_status' => 'single',
                        ],
                    ],

                    3 => [
                        [
                            'name' => 'Michael Garcia',
                            'birth_date' => '2010-02-20',
                            'sex' => 'male',
                            'civil_status' => 'single',
                        ],
                        [
                            'name' => 'Angela Garcia',
                            'birth_date' => '2014-07-05',
                            'sex' => 'female',
                            'civil_status' => 'single',
                        ],
                    ],

                    default => [
                        [
                            'name' => 'Daniel Reyes',
                            'birth_date' => '2016-01-25',
                            'sex' => 'male',
                            'civil_status' => 'single',
                        ],
                    ],
                }
            );
        }
    }
}