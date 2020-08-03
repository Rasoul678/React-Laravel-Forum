<?php

namespace App;

use App\Notifications\ThreadHasReply;
use App\Traits\Recordable;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use Recordable;

    protected $guarded = [];

    protected $with = ['creator', 'channel'];

    protected $appends = ['path'];

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

    public function scopeFilter($query, $filters)
    {
        return $filters->apply($query);
    }

    public function addReply($reply)
    {
        $reply = $this->replies()->create($reply);

        foreach ($this->subscriptions as $subscription)
        {
            if($subscription->user_id !== $reply->user_id)
            {
                $subscription->user->notify(new ThreadHasReply($this, $reply));
            }
        }

        return $reply;
    }

    public function subscribe($userId)
    {
        $this->subscriptions()->create([
            'user_id'=>$userId
        ]);
    }

    public function unsubscribe($userId)
    {
        $this->subscriptions()->where('user_id', $userId)->delete();
    }

    public function subscriptions()
    {
        return $this->hasMany(ThreadSubscription::class);
    }

    public function isSubscribed($userId)
    {
        return $this->subscriptions()->where('user_id', $userId)->exists();
    }
}
