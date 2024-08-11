<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\TaskUser;

class DashboardController extends Controller
{
    /**
     * Display dashboard with user projects
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $tasksUser = TaskUser::where('user_id', $user->id)->get();

        $tasks = [];

        foreach ($tasksUser as $taskuser) {
            array_push($tasks, $taskuser->task);
        }

        foreach($tasks as $task) {
            $task = $task->project;
        }

        return Inertia::render('Dashboard', [
            'tasks' => $tasks
        ]);
    }
}
