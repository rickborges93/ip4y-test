<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class ProjectsListTest extends TestCase
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


    public function test_it_should_be_able_to_show_the_projects_page(): void
    {
        $project1 = Project::factory()->create();

        $this->actingAs($this->user)
                ->get('/projects')
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                        ->component('Projects/List')
                    );

    }

    public function test_it_should_be_able_see_all_the_projects(): void
    {
        $project1 = Project::factory()->create();

        $this->actingAs($this->user)
                ->get('/projects')
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                        ->has('projects', 1, fn(Assert $page) => $page
                            ->where('id', strtoupper($project1->id))
                            ->where('name', $project1->name)
                            ->where('description', $project1->description)
                            ->etc()
                        )
                    );

    }
}
