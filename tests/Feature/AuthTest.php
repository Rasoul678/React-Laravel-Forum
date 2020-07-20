<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Artisan;
use Laravel\Passport\Passport;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function a_user_can_register ()
    {
        $response = $this->postJson('/api/auth/register', [
            'name'=>'John',
            'email'=>'john@gmail.com',
            'password'=>'password',
            'password_confirmation'=>'password'
        ]);

        $response->assertStatus(201);
    }

    /**
     * @test
     */
    public function a_user_can_login ()
    {
        Artisan::call('passport:install');

        $user = create(User::class);

        $token = $user->createToken('my-oauth-client-name')->accessToken;

        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];

        $payload = [
            'email'=>$user->email,
            'password'=>'password'
        ];

        $response = $this->postJson('/api/auth/login', $payload, $headers)->json();

        $this->assertArrayHasKey('access_token', $response);
    }

    /**
     * @test
     */
    public function we_can_get_authenticated_user ()
    {
        Artisan::call('passport:install');

        $user = create(User::class);

        Passport::actingAs($user);

        $token = $user->createToken('my-oauth-client-name')->accessToken;

        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];

        $response = $this->getJson('/api/auth/user', $headers)->json();

        $this->assertArrayHasKey('name', $response);
    }


}
