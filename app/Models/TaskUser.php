<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskUser extends Model
{
    use HasFactory;

    protected $table = 'tasks_users';

    protected $fillable = [
        'id',
        'task_id',
        'user_id',
    ];

    public function task(): BelongsTo {
        return $this->belongsTo(Task::class);
    }
}
