import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Project, Task } from '@/types';
import SuccessButton from '@/Components/SuccessButton';
import CreateNewProject from './Partials/CreateNewProject';
import { formatDate } from '@/utils/formatDate';
import DeleteProject from './Partials/DeleteProject';
import UpdateProject from './Partials/UpdateProject';
import CreateNewTask from './Partials/CreateNewTask';
import TaskStatus from '@/Components/TaskStatus';
import DeleteTask from './Partials/DeleteTask';
import UpdateTask from './Partials/UpdateTask';

export default function ProjectsDetail ({ auth, project, tasks }: PageProps<{ }>) {
  const [openModalTaskCreation, setOpenModalTaskCreation] = useState(false);
  const [openModalTaskRemotion, setOpenModalTaskRemotion] = useState(false);
  const [openModalTaskUpdate, setOpenModalTaskUpdate] = useState(false);

  const [idToDelete, setIdToDelete] = useState<null | string>(null);
  const [taskToUpdate, setTaskToUpdate] = useState<null | Task>(null);

  const handleOnCreateNewTask = () => {
    setOpenModalTaskCreation(true)
  }

  const handleOnCancelNewTask = () => {
    setOpenModalTaskCreation(false)
  }

  const handleDeleteTask = (id: string) => {
    setIdToDelete(id)
    setOpenModalTaskRemotion(true)
  }

  const handleCancelDeletion = () => {
    setIdToDelete(null)
    setOpenModalTaskRemotion(false)
  }

  const handleUpdateTask = (task: Task) => {
    setTaskToUpdate(task)
    setOpenModalTaskUpdate(true)
  }

  const handleCancelUpdate = () => {
    setTaskToUpdate(null)
    setOpenModalTaskUpdate(false)
  }

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between'>
                          <div className="p-6 text-gray-900 font-bold text-xl flex gap-2">
                            <span className="bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 shadow-md">
                              Project
                            </span>
                            {project.name}
                        </div>

                          <div className="flex justify-end mr-4 mt-4 mb-6">
                            <SuccessButton onClick={() => handleOnCreateNewTask()} className="ms-3">
                              New Task
                            </SuccessButton>
                          </div>
                        </div>

                        <div className="w-full p-4 sm:p-6">
                          <div className="grid gap-8">
                            { tasks && tasks.map(task =>
                              <article className="p-4 bg-white rounded-lg border border-gray-200 shadow-md border-b-4 border-b-indigo-400" key={task.id}>
                                <div className='flex gap-3 mb-3 justify-between'>

                                  <div className='flex gap-3 justify-start items-center'>
                                    <span className="bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 shadow-md">
                                      Task
                                    </span>
                                    <div className='flex flex-col'>
                                      <h2 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>{task.title}</h2>
                                      <p className='font-light text-gray-500 dark:text-gray-400"'>{task.description}</p>
                                    </div>
                                  </div>

                                  <div className='flex flex-col gap-3 items-center'>
                                    <TaskStatus status={task.status} />
                                    <span className='text-gray-900 text-xs font-bold'>{formatDate(new Date(task.validate_at))}</span>
                                  </div>

                                  <div className='flex gap-2 justify-end'>
                                    <button
                                      className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-yellow-500'
                                      onClick={() => handleUpdateTask(task)}
                                    >
                                      <svg className="feather feather-edit w-3 h-3 text-gray-900" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    </button>
                                    <button
                                      className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-red-500'
                                      onClick={() => handleDeleteTask(task.id)}
                                    >
                                      <svg fill="#111827" className='w-3 h-3 text-gray-900' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 290 290" xmlSpace="preserve"><g id="XMLID_24_"><g id="XMLID_29_"><path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15 h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"/></g><g id="XMLID_86_"><path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z"/></g></g></svg>
                                    </button>
                                  </div>
                                </div>
                              </article>)
                            }
                          </div>
                        </div>
                    </div>
                </div>
            </div>

            {openModalTaskCreation &&
              <CreateNewTask
                project_id={project.id}
                cancelCreation={handleOnCancelNewTask}
                openModal={openModalTaskCreation}
              />
            }

            {idToDelete &&
              <DeleteTask
                openModal={openModalTaskRemotion}
                idToRemove={idToDelete}
                cancelTaskRemotion={handleCancelDeletion}
              />
            }

            {taskToUpdate &&
              <UpdateTask
                cancelTaskUpdate={handleCancelUpdate}
                openModal={openModalTaskUpdate}
                task={taskToUpdate}
              />
            }
        </AuthenticatedLayout>
  )
}
