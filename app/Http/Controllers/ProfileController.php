<?php

namespace App\Http\Controllers;

use App\User;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        $activities = $user->activities()->latest()->with('subject')->get()->groupBy(function ($activity){
            return $activity->created_at->format('Y-m-d');
        });

        return response()->json(['activities'=>$activities, 'user'=>$user]);
    }
}
