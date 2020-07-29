<?php

namespace App;

use App\Traits\Favorable;
use App\Traits\Recordable;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use Favorable, Recordable;

    protected $guarded = [];

    protected $with = ['owner', 'favorites', 'thread'];

    protected $appends = ['favoritesCount'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($reply) {
                $reply->favorites()->delete();
                $reply->thread()->decrement('replies_count');
        });

        static::created(function($reply){
            $reply->thread()->increment('replies_count');
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
}
