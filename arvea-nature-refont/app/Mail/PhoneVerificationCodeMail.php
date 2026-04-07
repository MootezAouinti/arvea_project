<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PhoneVerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $code;

    public function __construct(string $code)
    {
        $this->code = $code;
    }

    public function build(): self
    {
        return $this
            ->subject('Vérification de votre numéro de téléphone')
            ->view('emails.phone-verification-code');
    }
}