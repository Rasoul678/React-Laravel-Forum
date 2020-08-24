<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ThreadVisit extends Model
{
    protected $guarded = [];

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
