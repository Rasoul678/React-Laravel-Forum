<?php

namespace App\Http\Controllers;

use App\Reply;
use App\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Reply $reply)
    {
        return $reply->like(request('userId'));
    }

    public function destroy(Reply $reply)
    {
        return $reply->disLike(request('userId'));
    }

    public function check(Reply $reply)
    {
        return $reply->isFavorited(request('authUserId'));
    }
}
