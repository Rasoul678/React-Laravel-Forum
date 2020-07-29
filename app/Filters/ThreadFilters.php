<?php


namespace App\Filters;


use App\Channel;
use App\User;

class ThreadFilters extends Filters
{
    protected $filters = ['by', 'channel', 'unanswered'];

    /**
     * Filter the query by a given username.
     *
     * @param $username
     * @return mixed
     */
    protected function by($username)
    {
        $user = User::whereName($username)->firstOrFail();

        return $this->builder->where('user_id', $user->id);
    }

    /**
     * Filter the query by channel.
     *
     * @param $channelSlug
     * @return mixed
     */
    public function channel($channelSlug)
    {
        $channel = Channel::whereSlug($channelSlug)->first();

        return $this->builder->where('channel_id', $channel->id);
    }

    public function unanswered()
    {
        return $this->builder->where('replies_count', 0);
    }

}
