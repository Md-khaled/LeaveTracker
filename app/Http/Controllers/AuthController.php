<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use App\Rules\AccountApproved;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'email' => 'required|email|max:250|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $credentials = $request->only('email', 'password');
        Auth::attempt($credentials);
        $request->session()->regenerate();
        return response()->json([
            'status' => 'success',
            'message' => 'You have successfully registered & logged in!',
        ]);

    }


    /**
     * Authenticate the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required','email', new AccountApproved($request)],
            'password' => 'required'
        ]);

        if(Auth::attempt($credentials))
        {
            $user = Auth::user();
            $request->session()->regenerate();
            return response()->json([
                'status' => true,
                'data' => $user,
                'message' => 'Successfully Logged In!',
                'token' => $user->createToken('mobile', ['role:', Role::Employee->value])->plainTextToken
            ], Response::HTTP_OK);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Your provided credentials do not match in our records.',
        ]);

    }
    /**
     * Fetch user data
     */
    public function user()
    {
        return response()->json([
            'data' => Auth::user()
        ]);
    }

    /**
     * Log out the user from application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
//        Auth::logout();
        Auth::user()->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout',
        ]);
    }
}
