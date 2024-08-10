<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;

class GenerateExtractsTest extends TestCase
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


    public function test_it_should_be_able_to_extract_pdf_tasks_analytics_without_filters(): void
    {
        $currentDate = now();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'title' => fake()->name(),
            'description' => fake()->name(),
            'validate_at' => date('d-m-Y H:i:s', strtotime("+10 days",strtotime($currentDate))),
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->get("/projects/{$project->id}/pdf")
                ->assertOk();

    }

    public function test_it_should_be_able_to_extract_pdf_tasks_analytics_with_status_filter(): void
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
            ->get("/projects/{$task->project_id}/pdf?finalDate=&initialDate=&status=completed")
                ->assertOk();
    }

    public function test_it_should_be_able_to_extract_pdf_tasks_analytics_with_all_filters(): void
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
            ->get("/projects/{$project->id}/pdf?finalDate=2024-08-30&initialDate=2024-08-10&status=all")
                ->assertOk();
    }

    public function test_it_should_be_able_to_extract_csv_tasks_analytics_without_filters(): void
    {
        $currentDate = now();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'title' => fake()->name(),
            'description' => fake()->name(),
            'validate_at' => date('d-m-Y H:i:s', strtotime("+10 days",strtotime($currentDate))),
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->get("/projects/{$project->id}/csv")
                ->assertOk();

    }

    public function test_it_should_be_able_to_extract_csv_tasks_analytics_with_status_filter(): void
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
            ->get("/projects/{$task->project_id}/csv?finalDate=&initialDate=&status=completed")
                ->assertOk();
    }

    public function test_it_should_be_able_to_extract_csv_tasks_analytics_with_all_filters(): void
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
            ->get("/projects/{$project->id}/csv?finalDate=2024-08-30&initialDate=2024-08-10&status=all")
                ->assertOk();
    }
}
