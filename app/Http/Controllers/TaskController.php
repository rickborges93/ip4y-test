<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use Inertia\Inertia;
use App\Notifications\TaskUpdated;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store (TaskCreateRequest $request) {
        $validated = $request->validated();
        $id = $validated['project_id'];


        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'validate_at' => date_format(new \DateTime($validated['validate_at']),'Y-d-m H:i:s.v'),
            'project_id' => $id
        ]);

        $project = Project::find($id);

        return Inertia::render('Projects/Details', [
            'project' => $project,
            'tasks' => $project->tasks
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdateRequest $request, $id)
    {
        $validated = $request->validated();

        $task = Task::find($id);
        $projectId = $task->project_id;

        $project = Project::find($projectId);

        $users = $task->users;

        foreach($users as $user) {
            $user->notify(new TaskUpdated($user, $project, $task));
        }

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'validate_at' => date_format(new \DateTime($validated['validate_at']),'Y-d-m H:i:s.v')
        ]);

        return to_route('projects.show', $projectId);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $projectId = $task->project_id;

        $task->delete();

        $project = Project::find($projectId);

        return Inertia::render('Projects/Details', [
            'project' => $project,
            'tasks' => $project->tasks
        ]);
    }
}
