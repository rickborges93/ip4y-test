<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $project->name }}</title>
</head>
<body>
    <h1>[Project] {{$project->name}}</h1>
    <h2>{{$project->description}}</h2>
    <br/>
    <hr/>
    <br/>
    <h2>Tasks:</h2>

    @foreach ($tasks as $task)
        <h3>{{$task->title}}</h3>
        <h4>{{$task->description}}</h4>
        <br/>
        @if (count($task->users) > 0)
            <ul>
                @foreach($task->users as $user)
                    <li>{{$user->name}}</li>
                @endforeach
            </ul>
        @endif
        <h5>Responsibles:</h5>


        <hr/>
    @endforeach

</body>
</html>
