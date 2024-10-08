<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Project extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'conclusion_date',
    ];

    protected $keyType = "string";

    public $incrementing = false;

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id', 'id');
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
