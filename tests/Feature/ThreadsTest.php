<?php

namespace Tests\Feature;

use App\Thread;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class ThreadsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function a_user_can_see_all_threads ()
    {
        $thread = create(Thread::class);

        $this->get('/api/threads')->assertSee($thread->title);
    }

    /**
     * @test
     */
    public function a_user_can_see_a_single_thread ()
    {
        $thread = create(Thread::class);

        $this->get('/api/threads/' . $thread->channel->slug . "/" . $thread->id)->assertSee($thread->body);
    }


    /**
     * @test
     */
    public function unauthorized_users_may_not_create_thread()
    {
        $thread = make(Thread::class);

        $this->postJson('/api/threads', $thread->toArray())->assertStatus(401);

        $this->assertDatabaseMissing('threads', ['title' => $thread->title]);
    }


    /**
     * @test
     */
    public function an_authenticated_user_can_create_threads()
    {
        $this->signIn();

        $thread = make(Thread::class, ['user_id'=>auth()->id()]);

        $response = $this->postJson('/api/threads', $thread->toArray())->json();

        $this->assertDatabaseHas('threads', ['title' => $response['title']]);

        $this->assertEquals($response['title'], $thread->title);
    }

}
