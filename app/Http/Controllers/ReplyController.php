<?php

namespace App\Http\Controllers;

use App\Thread;
use App\Reply;
use Illuminate\Support\Facades\Auth;

class ReplyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index']);
    }

    public function index(Thread $thread)
    {
        return $thread->replies;
    }

    public function store (Thread $thread){
        request()->validate([
            'body'=>'required'
        ]);

        $reply = $thread->addReply([
            'body'=>request('body'),
            'user_id'=>Auth::id()
        ]);

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
