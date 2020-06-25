<?php

namespace App\Http\Controllers;

use App\Thread;

class ThreadController extends Controller
{
    public function index(){
        return $threads = Thread::latest()->get();
    }

    public function store(){
        request()->validate([
            'title'=>'required',
            'body'=>'required'
        ]);
        $thread = Thread::create([
            'title'=>request('title'),
            'body'=>request('body'),
            'user_id'=>1
        ]);

        return response()->json($thread);
    }

    public function show(Thread $thread){
        return $thread = Thread::where('id', $thread->id)->get();
    }


    public function destroy(Thread $thread){
        $thread->delete();
    }
}
