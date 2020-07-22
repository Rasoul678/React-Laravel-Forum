<?php

namespace App\Http\Controllers;

use App\Channel;
use App\Filters\ThreadFilters;
use App\Thread;

class ThreadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index(ThreadFilters $filters){

        return Thread::filter($filters)->latest()->get();
    }

    public function store(){

        $attributes = request()->validate([
            'title'=>'required',
            'body'=>'required',
            'channel_id'=>'required'
        ]);

        $attributes['user_id'] = request('user_id');

        $thread = Thread::create($attributes);

        return response()->json($thread);
    }

    public function show(Channel $channel,Thread $thread){
        return Thread::whereId($thread->id)->first();
    }


    public function destroy(Thread $thread){
        $thread->delete();
        return response()->json('Your Thread has been deleted.');
    }
}
