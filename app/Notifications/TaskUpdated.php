<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class TaskUpdated extends Notification implements ShouldQueue
{
    use Queueable;
    private $user;
    private $project;
    private $task;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, Project $project, Task $task)
    {
        $this->user = $user;
        $this->project = $project;
        $this->task = $task;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Tarefa atualizada!')
                    ->greeting('Olá, '. $this->user->name.'!')
                    ->line('A tarefa "'.$this->task->title.'", referente ao projeto "'.$this->project->name.'", foi atualizada.')
                    ->line('Fique atento(a) às atualizações para não perder nada!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
