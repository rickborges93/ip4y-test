<?php

namespace App\Http\Controllers;

use DateTime;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\ProjectCreateUpdateRequest;
use Illuminate\Http\RedirectResponse;

use Barryvdh\DomPDF\Facade\Pdf;

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

    public function show(Request $request, $id) {
        $project = Project::find($id);

        $query = Task::query();
        $query->where('project_id', $id);

        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->initialDate && $request->finalDate) {
            $initialDate = (new DateTime($request->initialDate.' 00:00:01'))->format('d-m-Y H:i:s');
            $finalDate = (new DateTime($request->finalDate.' 23:59:59'))->format('d-m-Y H:i:s');

            $query->where('validate_at', '>=', $initialDate);
            $query->where('validate_at', '<=', $finalDate);
        }

        $tasks = $query->get();

        foreach($tasks as $task) {
            $task = $task->users;
        }

        return Inertia::render('Projects/Details', [
            'project' => $project,
            'tasks' => $tasks,
            'users' => User::all(),
        ]);
    }

    public function pdf(Request $request, $id) {
        $project = Project::find($id);

        $query = Task::query();
        $query->where('project_id', $id);

        if ($request->query('status') && $request->query('status') !== 'all') {
            $query->where('status', $request->query('status'));
        }

        if ($request->query('initialDate') && $request->query('finalDate')) {
            $initialDate = (new DateTime($request->query('initialDate').' 00:00:01'))->format('d-m-Y H:i:s');
            $finalDate = (new DateTime($request->query('finalDate').' 23:59:59'))->format('d-m-Y H:i:s');

            $query->where('validate_at', '>=', $initialDate);
            $query->where('validate_at', '<=', $finalDate);
        }

        $tasks = $query->get();

        foreach($tasks as $task) {
            $task = $task->users;
        }

        $data = [
            'tasks' => $tasks,
            'project' => $project,
        ];

        $pdf = Pdf::loadView('pdf.tasks', $data);
        return $pdf->download('tasks.pdf');
    }

    public function csv(Request $request, $id) {
        $project = Project::find($id);

        $query = Task::query();
        $query->where('project_id', $id);

        if ($request->query('status') && $request->query('status') !== 'all') {
            $query->where('status', $request->query('status'));
        }

        if ($request->query('initialDate') && $request->query('finalDate')) {
            $initialDate = (new DateTime($request->query('initialDate').' 00:00:01'))->format('d-m-Y H:i:s');
            $finalDate = (new DateTime($request->query('finalDate').' 23:59:59'))->format('d-m-Y H:i:s');

            $query->where('validate_at', '>=', $initialDate);
            $query->where('validate_at', '<=', $finalDate);
        }

        $tasks = $query->get();

        $arrayTasks = $tasks->toArray();

        foreach($tasks as $i => $task) {
            $concatNames = '';
            $users = $task->users;

            foreach($users as $index => $user) {
                if ($index === 0) {
                    $concatNames = $user->name;
                } else {
                    $concatNames .= ', '.$user->name;
                }
            }

            $arrayTasks[$i]['participants'] = $concatNames;
        }

        array_unshift($arrayTasks, array_keys($arrayTasks[0]));

        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename='.$project->name.'.csv',
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $callback = function() use ($arrayTasks)
        {
            $FH = fopen('php://output', 'w');
            foreach ($arrayTasks as $task) {
                fputcsv($FH, $task);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }
}
