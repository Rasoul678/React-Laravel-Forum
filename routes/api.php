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

Route::get('/threads', 'ThreadController@index');

Route::post('/threads', 'ThreadController@store');

Route::get('/threads/{thread}', 'ThreadController@show');

Route::delete('/threads/{thread}', 'ThreadController@destroy');

Route::post('/threads/{thread}/replies', 'ReplyController@store');
