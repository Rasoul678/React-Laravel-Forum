<?php

namespace App\Http\Controllers;

use App\Reply;

class FavoriteController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Reply $reply)
    {
        return $reply->like();
    }

    public function destroy(Reply $reply)
    {
        return $reply->disLike();
    }

    public function check(Reply $reply)
    {
        return $reply->isFavorited();
    }
}
