<?php

namespace App\Http\Controllers;

use App\Thread;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Thread $thread)
    {
        $thread->subscribe(Auth::id());
        return response()->json('Subscribed to thread');
    }

    public function destroy(Thread $thread)
    {
        $thread->unsubscribe(Auth::id());
        return response()->json('Unsubscribed from thread');
    }

    public function check(Thread $thread)
    {
        return $thread->isSubscribed(Auth::id());
    }
}
