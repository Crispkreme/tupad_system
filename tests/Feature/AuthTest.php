<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful admin login.
     */
    public function test_admin_can_login(): void
    {
        User::factory()->create([
            'name' => 'TUPAD Administrator',
            'email' => 'admin@tupad.test',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@tupad.test',
            'password' => 'password123',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Login successful.',
            ])
            ->assertJsonPath(
                'user.email',
                'admin@tupad.test'
            );

        $this->assertAuthenticated('web');
    }

    /**
     * Test successful staff login.
     */
    public function test_staff_can_login(): void
    {
        User::factory()->create([
            'name' => 'TUPAD Staff',
            'email' => 'staff@tupad.test',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'staff@tupad.test',
            'password' => 'password123',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Login successful.',
            ])
            ->assertJsonPath(
                'user.email',
                'staff@tupad.test'
            );

        $this->assertAuthenticated('web');
    }

    /**
     * Test login with incorrect password.
     */
    public function test_user_cannot_login_with_wrong_password(): void
    {
        User::factory()->create([
            'name' => 'TUPAD Administrator',
            'email' => 'admin@tupad.test',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@tupad.test',
            'password' => 'wrong-password',
        ]);

        $response
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid email or password.',
            ]);

        $this->assertGuest('web');
    }

    /**
     * Test authenticated user can get current user.
     */
    public function test_authenticated_user_can_get_current_user(): void
    {
        $user = User::factory()->create([
            'name' => 'TUPAD Administrator',
            'email' => 'admin@tupad.test',
            'password' => 'password123',
        ]);

        $this->actingAs($user, 'web');

        $response = $this->getJson('/api/user');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath(
                'user.email',
                'admin@tupad.test'
            );
    }

    /**
     * Test guest cannot access protected endpoint.
     */
    public function test_guest_cannot_access_user_endpoint(): void
    {
        $response = $this->getJson('/api/user');

        $response->assertUnauthorized();
    }

    /**
     * Test admin can logout.
     */
    public function test_admin_can_logout(): void
    {
        $user = User::factory()->create([
            'name' => 'TUPAD Administrator',
            'email' => 'admin@tupad.test',
            'password' => 'password123',
        ]);

        $this->actingAs($user, 'web');

        $this->assertAuthenticated('web');

        $response = $this->postJson('/api/logout');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Logout successful.',
            ]);

        $this->assertGuest('web');
    }
}
