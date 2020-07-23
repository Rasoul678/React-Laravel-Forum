<?php

namespace App;

use App\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $guarded = [];

    protected $with = ['owner'];

    protected $appends = ['favoritesCount'];

    protected static function boot()
    {
        parent::boot();

        Reply::deleting(function ($reply) {
                $reply->favorites()->delete();
        });
    }

    public function thread ()
    {
        return $this->belongsTo(Thread::class);
    }

    public function owner ()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favorited');
    }

    public function like($userId)
    {
        if(! $this->favorites()->where('user_id', $userId)->exists())
        {
            $this->favorites()->create(['user_id'=>$userId,]);
        }
        return $this;
    }

    public function disLike($userId)
    {
        if($this->favorites()->where('user_id', $userId)->exists())
        {
            $this->favorites()->where('user_id', $userId)->delete();
        }
        return $this;
    }

    public function getFavoritesCountAttribute()
    {
        return $this->favorites()->count();
    }

    public function isFavorited($authUserId)
    {
        return $this->favorites()->where('user_id', $authUserId)->exists();
    }
}
