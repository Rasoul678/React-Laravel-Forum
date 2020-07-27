<?php

namespace App;

use App\Traits\Recordable;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use Recordable;

    protected $guarded = [];

    protected $with = ['creator', 'channel'];

    protected $appends = ['path', 'repliesCount'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($thread) {
            foreach ($thread->replies as $reply)
            {
                $reply->favorites()->delete();
            }

            $thread->replies->each->delete();
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function replies()
    {
        return $this->hasMany(Reply::class)->latest();
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function getPathAttribute()
    {
        return "/threads/" . $this->channel->slug . "/" . $this->id;
    }

    public function getRepliesCountAttribute()
    {
        return $this->replies()->count();
    }

    public function scopeFilter($query, $filters)
    {
        return $filters->apply($query);
    }
}
