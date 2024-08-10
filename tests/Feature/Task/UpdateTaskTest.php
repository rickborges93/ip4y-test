<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class UpdateTaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prepare the test
     */
    public function setUp() : void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }


    public function test_it_should_be_able_to_update_a_task(): void
    {
        $task = Task::factory()->create();

        $taskId = strtoupper($task->id);
        $projectId = strtoupper($task->project_id);

        $response = $this
            ->actingAs($this->user)
            ->put("/tasks/{$taskId}", [
                'title' => 'Updated task',
                'description' => $task->description,
                'validate_at' => now(),
                'status' => 'completed'
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect("/projects/{$projectId}");

    }

    public function test_it_should__not_be_able_to_update_a_project_without_passing_title_through_request(): void
    {
        $task = Task::factory()->create();

        $projectId = strtoupper($task->project_id);

        $response = $this
            ->actingAs($this->user)
            ->put("/tasks/{$task->id}", [
                'description' => $task->description,
                'validate_at' => now(),
                'status' => 'completed'
            ]);

        $response
            ->assertSessionHasErrors('title');

    }
}
