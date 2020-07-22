<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    protected $guarded = [];

    protected $with = ['creator', 'replies', 'channel'];

    protected $appends = ['path'];

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
}
