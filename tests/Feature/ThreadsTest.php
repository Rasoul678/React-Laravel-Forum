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
    public function an_authenticated_user_can_create_threads ()
    {
        $this->signIn();

        $thread = make(Thread::class, ['user_id'=>auth()->id()]);

       $this->postJson('/api/threads', $thread->toArray());

        $this->assertDatabaseHas('threads', ['title'=>$thread->title]);
    }

}
