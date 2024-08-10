<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class DeleteProjectTest extends TestCase
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


    public function test_it_should_be_able_to_delete_a_project(): void
    {
        $project = Project::factory()->create();

        $this->actingAs($this->user)
                ->delete("/projects/{$project->id}")
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                        ->component('Projects/List')
                    );

    }

    public function test_it_should_be_able_to_delete_a_project_and_see_others_that_are_registered(): void
    {
        $project = Project::factory()->create();
        $project2 = Project::factory()->create();

        $this->actingAs($this->user)
                ->delete("/projects/{$project->id}")
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                            ->has('projects', 1, fn(Assert $page) => $page
                            ->where('id', strtoupper($project2->id))
                            ->where('name', $project2->name)
                            ->where('description', $project2->description)
                            ->etc()
                        )
                    );

    }
}
