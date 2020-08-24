<?php

namespace App\Http\Controllers;

use App\Thread;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class VisitController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function visit(Thread $thread)
    {
        if(!!$thread->visitors()->where('user_id', Auth::id())->first())
        {
            $thread->visitors()->where('user_id', Auth::id())->update([
                'updated_at'=>Carbon::now()
            ]);
        }else{
            $thread->visitors()->create([
                'user_id'=>Auth::id()
            ]);
        }

        return response(['message'=>'You are visiting "' . $thread->title . '" thread']);
    }
}
