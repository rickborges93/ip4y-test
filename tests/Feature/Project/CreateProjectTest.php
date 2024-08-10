<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class CreateProjectTest extends TestCase
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


    public function test_it_should_be_able_to_create_a_project(): void
    {
        $this->actingAs($this->user)
                ->post('/projects', [
                    'name' => 'Project one',
                    'description' => 'New project to start',
                    'conclusion_date' => now(),
                ])
                    ->assertOk()
                    ->assertInertia(fn(Assert $page) => $page
                        ->component('Projects/List')
                    );

    }
}
