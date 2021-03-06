<?php

/** @var Factory $factory */

use App\Channel;
use App\Thread;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Thread::class, function (Faker $faker) {
    return [
        'title'=>$faker->name,
        'body'=>$faker->sentence,
        'user_id'=>factory(User::class),
        'channel_id'=>factory(Channel::class)
    ];
});

$factory->state(Thread::class, 'locked', [
    'locked'=>true,
]);
