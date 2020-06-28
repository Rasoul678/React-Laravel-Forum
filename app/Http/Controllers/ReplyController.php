<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;
use App\Reply;

class ReplyController extends Controller
{
    public function store (Thread $thread){
        $attributes = request()->validate([
            'body'=>'required'
        ]);

        $attributes['thread_id'] = $thread->id;

        $attributes['user_id'] = request('auth_user_id');

        $reply = Reply::create($attributes);

        return response()->json($reply);
    }
}
