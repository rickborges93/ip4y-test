<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Project;
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

    public static function boot() {
        parent::boot();

        static::creating(function(Model $model) {
            if (empty($model->id)) {
                $model->id = Str::uuid();
            }
        });
    }
}
