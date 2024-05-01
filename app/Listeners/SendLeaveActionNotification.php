<?php

namespace App\Listeners;

use App\Events\LeaveActionNotification;
use App\Mail\LeaveActionNotificationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendLeaveActionNotification
{


    /**
     * Handle the event.
     */
    public function handle(LeaveActionNotification $event): void
    {
        $actionType = $event->actionType;
        $mailable = new LeaveActionNotificationMail($event->leaveRequest, $actionType);

        Mail::to($event->leaveRequest->user->email)
            ->send($mailable);
    }
}
