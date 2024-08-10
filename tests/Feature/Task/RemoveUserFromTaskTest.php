<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class RemoveUserFromTaskTest extends TestCase
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


    public function test_it_should_be_able_to_remove_user_from_task(): void
    {
        $task = Task::factory()->create();

        $this->actingAs($this->user)
                ->post('/taskuser', [
                    'taskid' => $task->id,
                    'userid' => $this->user->id
                ]);

        $response = $this->actingAs($this->user)
                ->delete("/taskuser/{$task->id}/{$this->user->id}");

        $response->assertRedirect(route('projects.show', strtoupper($task->project_id)));
    }
}
