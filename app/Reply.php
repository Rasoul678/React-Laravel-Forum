<?php

namespace App;

use App\Traits\Favorable;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use Favorable;

    protected $guarded = [];

    protected $with = ['owner', 'favorites'];

    protected $appends = ['favoritesCount'];

    protected static function booted()
    {
        parent::booted();

        static::deleting(function ($reply) {
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
}
