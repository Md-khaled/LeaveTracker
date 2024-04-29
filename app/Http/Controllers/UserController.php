<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function singleUser()
    {
        return response()->json([
            'success' => true,
            'data' => Auth::user(),
        ], 200);
    }

    public function userList()
    {
        $users = User::get();
        return response()->json([
            'success' => true,
            'data' => $users,
        ], 200);
    }

    public function userApproved(Request $request)
    {
        $user = User::find($request->id);

        if ($user) {
            $user->update([
                'account_status' => $request->account_status,
            ]);
            return response()->json(
                [
                    'success' => true,
                    'message' => 'User Updated'
                ], Response::HTTP_OK);
        } else {
            return response()->json(['success' => false, 'error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

    }

    /**
     * Store a new user.
     *
     * @param \Illuminate\Http\Request $request
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([
                'status' => 'success',
                'data' => Auth::user(),
                'message' => 'Successfully Logged In!',
            ]);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout',
        ]);
    }
}
