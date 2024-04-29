<?php

namespace App\Models;

use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'type',
        'start_date',
        'end_date',
        'reason',
        'status',
        'comment_by_admin'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'type' => LeaveType::class,
        'status' => LeaveStatus::class,
    ];
}
