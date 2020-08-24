<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::get('/threads', 'ThreadController@index');

Route::post('/threads', 'ThreadController@store');

Route::get('/threads/{channel:slug}/{thread}', 'ThreadController@show');

Route::patch('/threads/{channel:slug}/{thread}', 'ThreadController@update');

Route::delete('/threads/{thread}', 'ThreadController@destroy');

Route::post('/threads/{thread}/replies', 'ReplyController@store');

Route::delete('/threads/{thread}/replies/{reply}', 'ReplyController@destroy');

Route::patch('/threads/{thread}/replies/{reply}', 'ReplyController@update');

Route::get('/threads/{thread}/replies', 'ReplyController@index');

Route::get('/channels', 'ChannelController@index');

Route::get('/replies/{reply}/favorites', 'FavoriteController@store');

Route::delete('/replies/{reply}/favorites', 'FavoriteController@destroy');

Route::get('/replies/{reply}/favorites/favored', 'FavoriteController@check');

Route::get('/profiles/{user:name}', 'ProfileController@show');

Route::get('/profiles/{user}/notifications', 'NotificationController@index');

Route::delete('/profiles/{user}/notifications/{notification}', 'NotificationController@destroy');

Route::post('/threads/{thread}/subscriptions', 'SubscriptionController@store');

Route::delete('/threads/{thread}/subscriptions', 'SubscriptionController@destroy');

Route::get('/threads/{thread}/subscriptions/subscribed', 'SubscriptionController@check');

Route::post('/threads/{thread}/visits', 'VisitController@visit');
