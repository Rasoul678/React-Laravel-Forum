<?php


namespace App\Traits;

use App\Favorite;

trait Favorable
{
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favorited');
    }

    public function isFavorited($authUserId)
    {
        return $this->favorites()->where('user_id', $authUserId)->exists();
    }

    public function disLike($userId)
    {
        if ($this->favorites()->where('user_id', $userId)->exists()) {
            $this->favorites()->where('user_id', $userId)->delete();
        }
        return $this;
    }

    public function like($userId)
    {
        if (!$this->favorites()->where('user_id', $userId)->exists()) {
            $this->favorites()->create(['user_id' => $userId,]);
        }
        return $this;
    }

    public function getFavoritesCountAttribute()
    {
        return $this->favorites()->count();
    }
}
