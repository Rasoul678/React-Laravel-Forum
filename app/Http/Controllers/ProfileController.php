<?php

namespace App\Http\Controllers;

use App\User;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        $user = User::with('threads')->whereId($user->id)->first();

        return response()->json($user);
    }
}
