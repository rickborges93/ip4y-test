<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class DeleteTaskTest extends TestCase
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


    public function test_it_should_be_able_to_delete_a_task(): void
    {
        $task = Task::factory()->create();

        $this->actingAs($this->user)
                ->delete("/tasks/{$task->id}")
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                        ->component('Projects/Details')
                    );

    }

    public function test_it_should_be_able_to_delete_a_task_and_see_others_that_are_registered(): void
    {
        $currentDate = now();
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'title' => fake()->name(),
            'description' => fake()->name(),
            'validate_at' => date('d-m-Y H:i:s', strtotime("+10 days",strtotime($currentDate))),
            'project_id' => $project->id,
        ]);

        $task2 = Task::factory()->create([
            'title' => fake()->name(),
            'description' => fake()->name(),
            'validate_at' => date('d-m-Y H:i:s', strtotime("+40 days",strtotime($currentDate))),
            'project_id' => $project->id,
        ]);

        $this->actingAs($this->user)
                ->delete("/tasks/{$task->id}")
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                            ->has('tasks', 1, fn(Assert $page) => $page
                            ->where('id', strtoupper($task2->id))
                            ->where('title', $task2->title)
                            ->where('description', $task2->description)
                            ->etc()
                        )
                    );

    }
}
