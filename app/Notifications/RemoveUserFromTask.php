<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class RemoveUserFromTask extends Notification implements ShouldQueue
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
                    ->subject('Você foi removido de uma tarefa!')
                    ->greeting('Olá, '. $this->user->name.'!')
                    ->line('Você foi removido da tarefa "'.$this->task->title.'" referente ao projeto "'.$this->project->name.'".')
                    ->line('Em caso de dúvida entre em contato com seu supervisor.');
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
