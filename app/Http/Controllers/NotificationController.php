<?php

namespace App\Http\Controllers;

use App\User;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(User $user)
    {
        return $user->unreadNotifications();
    }

    public function destroy(User $user, $notificationId)
    {
        $user->notifications()->findOrFail($notificationId)->markAsRead();
        return response()->json('Marked As Read');
    }
}
