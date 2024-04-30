<?php

namespace App\Http\Controllers;

use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Models\Leave;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class LeaveController extends Controller
{
    public function leaves(Request $request)
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
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type' => ['required', Rule::in(LeaveType::cases())],
            'start_date' => 'required|date|after:yesterday',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        $leave = Auth::user()->leaves()->create($validatedData);
        return response()->json(['status' => 'success', 'data' => $leave], 201);
    }

    public function leaveApproved(Request $request)
    {
        $leave = Leave::find($request->id);

        if ($leave) {
            $leave->update([
                'status' => $request->status,
                'comment_by_admin' => $request->comment_by_admin,
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

    public function leaveStatus(Request $request)
    {
        $data['statuses'] = LeaveStatus::cases();

        return response()->json([
            'status' => 'success',
            'data' => $data,
            'message' => 'Successfully Logged In!',
        ]);
    }

    public function leaveTypes(Request $request)
    {
        $data['types'] = LeaveType::cases();

        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'success',
        ]);
    }
}
