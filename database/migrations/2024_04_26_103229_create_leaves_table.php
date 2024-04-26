<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\LeaveType;
use App\Enums\LeaveStatus;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->enum('type', LeaveType::cases());
            $table->date('start_date');
            $table->date('end_date');
            $table->longText('reason')->nullable();
            $table->enum('status', LeaveStatus::cases())->default(LeaveStatus::Pending);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
