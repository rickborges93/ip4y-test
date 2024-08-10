<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class AddUserToTaskTest extends TestCase
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


    public function test_it_should_be_able_to_add_user_to_task(): void
    {
        $task = Task::factory()->create();

        $response = $this->actingAs($this->user)
                ->post('/taskuser', [
                    'taskid' => $task->id,
                    'userid' => $this->user->id
                ]);

        $response->assertRedirect(route('projects.show', strtoupper($task->project_id)));
    }
}
