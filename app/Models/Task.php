<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Project;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Task extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'id',
        'title',
        'description',
        'status',
        'validate_at',
        'project_id',
    ];

    protected $keyType = "string";

    public $incrementing = false;

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'tasks_users', 'task_id', 'user_id');
    }

    public static function boot() {
        parent::boot();

        static::creating(function(Model $model) {
            if (empty($model->id)) {
                $model->id = Str::uuid();
            }
        });
    }
}
