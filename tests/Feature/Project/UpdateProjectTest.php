<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class UpdateProjectTest extends TestCase
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


    public function test_it_should_be_able_to_update_a_project(): void
    {
        $project = Project::factory()->create();

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->put("/projects/{$project->id}", [
                'name' => 'Updated project',
                'description' => $project->description,
                'conclusion_date' => $project->conclusion_date,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect("/projects/{$project->id}");

    }

    public function test_it_should__not_be_able_to_update_a_project_without_passing_name_through_request(): void
    {
        $project = Project::factory()->create();

        $response = $this
            ->actingAs($this->user)
            ->from('/projects')
            ->put("/projects/{$project->id}", [
                'description' => $project->description,
                'conclusion_date' => $project->conclusion_date,
            ]);

        $response
            ->assertSessionHasErrors('name')
            ->assertRedirect("/projects");

    }
}
