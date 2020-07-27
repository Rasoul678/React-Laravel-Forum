<?php


namespace App\Traits;

use App\Favorite;
use Illuminate\Support\Facades\Auth;

trait Favorable
{
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favorited');
    }

    public function isFavorited()
    {
        return $this->favorites()->where('user_id', Auth::id())->exists();
    }

    public function disLike()
    {
        if ($this->favorites()->where('user_id', Auth::id())->exists()) {
            $this->favorites()->where('user_id', Auth::id())->delete();
        }
        return $this;
    }

    public function like()
    {
        if (!$this->favorites()->where('user_id', Auth::id())->exists()) {
            $this->favorites()->create(['user_id' => Auth::id()]);
        }
        return $this;
    }

    public function getFavoritesCountAttribute()
    {
        return $this->favorites()->count();
    }
}
