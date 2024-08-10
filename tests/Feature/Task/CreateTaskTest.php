<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class CreateTaskTest extends TestCase
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


    public function test_it_should_be_able_to_create_a_task(): void
    {
        $project = Project::factory()->create();

        $response = $this->actingAs($this->user)
                ->post('/tasks', [
                    'title' => 'Task one',
                    'description' => 'New task to start',
                    'validate_at' => now(),
                    'status' => 'pending',
                    'project_id' => $project->id
                ]);

        $response
            ->assertOk()
            ->assertInertia(fn(Assert $page) => $page
                ->component('Projects/Details')
            );

    }

    public function test_it_should_not_be_able_to_create_a_task_without_request_body(): void
    {
        $response = $this->actingAs($this->user)
                ->post('/tasks', [
                    'description' => 'New task to start',
                    'validate_at' => now(),
                ]);

        $response
            ->assertSessionHasErrors('title');

    }
}
