<?php

namespace App\Http\Controllers;

use App\Enums\LeaveStatus;
use App\Models\Leave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        $data['leaves'] = Leave::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        $data['statuses'] = LeaveStatus::cases();

        return response()->json([
            'status' => 'success',
            'data' => $data,
            'message' => 'Successfully Logged In!',
        ]);
    }
}
