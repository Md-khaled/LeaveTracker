<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

class AccountApproved implements Rule
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function passes($attribute, $value)
    {
        $email = $this->request->input('email');
        $user = User::where('email', $email)->first();

        return $user && $user->account_status === 'approved';
    }

    public function message()
    {
        return 'Your account is not approved. Please contact the administrator.';
    }
}
