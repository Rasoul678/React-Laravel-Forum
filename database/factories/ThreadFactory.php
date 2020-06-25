<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Thread;
use App\User;
use Faker\Generator as Faker;

$factory->define(Thread::class, function (Faker $faker) {
    return [
        'title'=>$faker->name,
        'body'=>$faker->sentence,
        'user_id'=>factory(User::class)
    ];
});
