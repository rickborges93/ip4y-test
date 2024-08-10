<?php

namespace App\Http\Controllers;

use App\Models\TaskUser;
use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\TaskUserCreateRequest;
use App\Notifications\AddUserToTask;
use App\Notifications\RemoveUserFromTask;

class TaskUserController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskUserCreateRequest $request)
    {
        $validated = $request->validated();

        $idTask = $validated['taskid'];
        $idUser = $validated['userid'];

        $task = Task::find($idTask);
        $project = Project::find($task->project_id);

        $isTaskUserExists = TaskUser::where('user_id', $idUser)->where('task_id', $idTask)->first();

        if ($isTaskUserExists) {
            return to_route('projects.show', $task->project_id);
        }

        $user = User::findOrFail($idUser);
        $user->taskUser()->attach($idTask);

        $user->notify(new AddUserToTask($user, $project, $task));

        return to_route('projects.show', $task->project_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($taskId, $userId)
    {
        $taskUserToDelete = TaskUser::where('user_id', $userId)->where('task_id', $taskId)->first();
        $taskUserToDelete->delete();

        $user = User::find($userId);
        $task = Task::find($taskId);
        $project = Project::find($task->project_id);

        $user->notify(new RemoveUserFromTask($user, $project, $task));

        return to_route('projects.show', $task->project_id);
    }
}
