<?php

namespace App\Http\Controllers;

use App\Thread;

class ThreadController extends Controller
{
    public function index(){
        return $threads = Thread::latest()->get();
    }

    public function store(){

        $attributes = request()->validate([
            'title'=>'required',
            'body'=>'required'
        ]);

        $attributes['user_id'] = request('auth_user_id');

        $thread = Thread::create($attributes);

        return response()->json($thread);
    }

    public function show(Thread $thread){
        return $thread = Thread::where('id', $thread->id)->get();
    }


    public function destroy(Thread $thread){
        $thread->delete();
    }
}
