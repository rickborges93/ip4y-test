<?php

namespace App\Http\Controllers;

use App\Models\TaskUser;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskUserCreateRequest;

class TaskUserController extends Controller
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
    public function store(TaskUserCreateRequest $request)
    {
        $validated = $request->validated();

        $idTask = $validated['taskid'];
        $idUser = $validated['userid'];

        $task = Task::find($idTask);

        $isTaskUserExists = TaskUser::where('user_id', $idUser)->where('task_id', $idTask)->first();

        if ($isTaskUserExists) {
            return to_route('projects.show', $task->project_id);
        }

        $user = User::findOrFail($idUser);
        $user->taskUser()->attach($idTask);

        return to_route('projects.show', $task->project_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskUser $taskUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskUser $taskUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskUser $taskUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($taskId, $userId)
    {
        $taskUserToDelete = TaskUser::where('user_id', $userId)->where('task_id', $taskId)->first();
        $taskUserToDelete->delete();

        $task = Task::find($taskId);

        return to_route('projects.show', $task->project_id);
    }
}
