<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class ShowTasksFromProjectTest extends TestCase
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


    public function test_it_should_be_able_to_access_project_details_without_tasks(): void
    {
        $project = Project::factory()->create();

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->get("/projects/{$project->id}")
                ->assertOk()
                ->assertInertia(fn(Assert $page) => $page
                    ->component('Projects/Details')
            );

    }

    public function test_it_should_be_able_to_access_project_details_with_tasks(): void
    {
        $task = Task::factory()->create();

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->get("/projects/{$task->project_id}")
                ->assertOk()
                ->assertInertia(fn(Assert $page) => $page
                    ->component('Projects/Details')
            );

    }

    public function test_it_should_be_able_to_access_project_details_with_tasks_and_status_filter(): void
    {
        $currentDate = now();

        $task = Task::factory()->create([
            'title' => fake()->name(),
            'description' => fake()->name(),
            'validate_at' => date('d-m-Y H:i:s', strtotime("+10 days",strtotime($currentDate))),
            'status' => 'completed'
        ]);

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->get("/projects/{$task->project_id}?finalDate=&initialDate=&status=completed")
                ->assertOk()
                ->assertInertia(fn(Assert $page) => $page
                    ->component('Projects/Details')
            );

        $response->assertInertia(fn(Assert $page) => $page
                    ->has('tasks', 1, fn(Assert $page) => $page
                        ->where('id', strtoupper($task->id))
                        ->where('status', 'completed')
                        ->etc()
            )
        );
    }

    public function test_it_should_be_able_to_access_project_details_with_tasks_and_date_filters(): void
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

        $response = $this
            ->actingAs($this->user)
            ->get("/projects/{$project->id}?finalDate=2024-08-30&initialDate=2024-08-10&status=all")
                ->assertOk()
                ->assertInertia(fn(Assert $page) => $page
                    ->has('tasks', 1, fn(Assert $page) => $page
                        ->where('id', strtoupper($task->id))
                        ->where('title', $task->title)
                        ->where('description', $task->description)
                        ->etc()
            )
        );
    }
}
