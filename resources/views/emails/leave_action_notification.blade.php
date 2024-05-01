<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave Request {{ ucfirst($actionType) }}</title>
    <style>
        /* Add your custom styles here */
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col">
            <h2 class="mt-3">Hello {{ $leaveRequest->user->name }},</h2>
            <p>Your leave request has been {{ $actionType }}.</p>
            <p><strong>Leave Dates:</strong> {{ $leaveRequest->start_date }} to {{ $leaveRequest->end_date }}</p>
            <p><strong>Reason:</strong> {{ $leaveRequest->reason }}</p>
            <p class="mt-4">Regards,<br>Your Company</p>
        </div>
    </div>
</div>
</body>
</html>
