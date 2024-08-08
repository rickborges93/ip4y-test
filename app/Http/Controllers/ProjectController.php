<?php

namespace App\Http\Controllers;

use DateTime;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\ProjectCreateUpdateRequest;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index () {
        return Inertia::render('Projects/List', [
            'projects' => Project::all()
        ]);
    }

    public function store (ProjectCreateUpdateRequest $request) {
        $validated = $request->validated();

        Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'conclusion_date' => date_format(new \DateTime($validated['conclusion_date']),'Y-d-m H:i:s.v')
        ]);

        return Inertia::render('Projects/List', [
            'projects' => Project::all()
        ]);
    }

    public function destroy ($id) {
        Project::find($id)->delete();

        return Inertia::render('Projects/List', [
            'projects' => Project::all()
        ]);
    }

    public function update(ProjectCreateUpdateRequest $request, $id) {
        $validated = $request->validated();

        Project::find($id)->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'conclusion_date' => date_format(new \DateTime($validated['conclusion_date']),'Y-d-m H:i:s.v')
        ]);

        return to_route('projects.show', $id);
    }

    public function show($id) {
        $project = Project::find($id);

        return Inertia::render('Projects/Details', [
            'project' => $project,
            'tasks' => $project->tasks
        ]);
    }
}
