<?php

namespace App\Http\Controllers;

use App\Thread;
use App\Reply;

class ReplyController extends Controller
{
    public function index(Thread $thread)
    {
        return $thread->replies;
    }

    public function store (Thread $thread){
        $attributes = request()->validate([
            'body'=>'required'
        ]);

        $attributes['thread_id'] = $thread->id;

        $attributes['user_id'] = request('auth_user_id');

        $reply = Reply::create($attributes);

        return response()->json($reply->thread);
    }

    public function update(Thread $thread, Reply $reply)
    {
        $reply->update([
            'body'=>request('body')
        ]);

        return response()->json($reply->fresh());
    }

    public function destroy(Thread $thread, Reply $reply)
    {
        $reply->delete();

        return response()->json($thread->fresh());
    }
}
