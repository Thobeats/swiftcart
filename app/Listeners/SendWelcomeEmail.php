<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use App\Mail\WelcomeMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use \Illuminate\Support\Facades\URL;


class SendWelcomeEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {

        $verificationLink = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $event->user->id, 'hash' => sha1($event->user->email)]
        );
        $event->user->verification_link = $verificationLink;
                \Log::info(json_encode($event));

        Mail::to($event->user->email)->send(new WelcomeMail($event->user));
    }
}
