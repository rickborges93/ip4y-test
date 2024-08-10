import { useEffect, useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ETaskStatus, PageProps, Project, Task, User } from '@/types';
import SuccessButton from '@/Components/SuccessButton';
import { formatDate } from '@/utils/formatDate';
import CreateNewTask from './Partials/CreateNewTask';
import TaskStatus from '@/Components/TaskStatus';
import DeleteTask from './Partials/DeleteTask';
import UpdateTask from './Partials/UpdateTask';
import AddUserToTask from './Partials/AddUserToTask';
import RemoveUserFromTask from './Partials/RemoveUserFromTask';
import TextInput from '@/Components/TextInput';
import axios from 'axios';


export default function ProjectsDetail({ auth, project, tasks, users }: PageProps<{}>) {
  const selectInput = useRef<HTMLSelectElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  const { data, setData, get, post } = useForm({
    status: '',
    initialDate: '',
    finalDate: '',
  })

  useEffect(() => {
    if (data.status !== '' || (data.initialDate !== '' && data.finalDate !== '')) {
      get(route('projects.show', project.id), {
        preserveState: true
      })
    }

  }, [data.status, data.initialDate, data.finalDate])

  const handleGeneratePdf = () => {

    fetch(route('projects.pdf', {
      id: project.id,
      status: data.status,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
    }))
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const file = window.URL.createObjectURL(blob)
        a.href = file;
        a.download = 'task.pdf';
        a.click();
        window.URL.revokeObjectURL(file);
      })
  }

  const handleGenerateCsv = () => {

    fetch(route('projects.csv', {
      id: project.id,
      status: data.status,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
    }))
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const file = window.URL.createObjectURL(blob)
        a.href = file;
        a.download = 'task.csv';
        a.click();
        window.URL.revokeObjectURL(file);
      })
  }

  const [openModalTaskCreation, setOpenModalTaskCreation] = useState(false);
  const [openModalTaskRemotion, setOpenModalTaskRemotion] = useState(false);
  const [openModalTaskUpdate, setOpenModalTaskUpdate] = useState(false);
  const [openModalTaskUser, setOpenModalTaskUser] = useState(false);
  const [openModalRemoveUserFromTask, setOpenModalRemoveUserFromTask] = useState(false);

  const [idToDelete, setIdToDelete] = useState<null | string>(null);
  const [taskToUpdate, setTaskToUpdate] = useState<null | Task>(null);
  const [taskToAddUser, setTaskToAddUser] = useState<null | Task>(null);

  const [userIdToRemoveFromTask, setUserIdToRemoveFromTask] = useState<null | number>(null);
  const [taskIdToRemoveUser, setTaskIdToRemoveUser] = useState<null | string>(null);

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

  const handleTaskToAddUser = (task: Task) => {
    setTaskToAddUser(task)
    setOpenModalTaskUser(true)
  }

  const handleCancelTaskToAddUser = () => {
    setTaskToAddUser(null)
    setOpenModalTaskUser(false)
  }

  const handleRemoveUserFromTask = (taskId: string, userId: number) => {
    setUserIdToRemoveFromTask(userId)
    setTaskIdToRemoveUser(taskId)
    setOpenModalRemoveUserFromTask(true)
  }

  const handleCancelRemoveUserFromTask = () => {
    setUserIdToRemoveFromTask(null)
    setTaskIdToRemoveUser(null)
    setOpenModalRemoveUserFromTask(false)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project</h2>}
    >
      <Head title="Projects" />

      <div className='p-12'>
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

            <div className='pb-6 pt-6'>
              <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg'>
                  <div className='p-3 text-gray-900 font-bold text-xs flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <div>Filters</div>
                      <div className='flex gap-2'>
                        <button
                          className='flex justify-center items-center rounded-md bg-red-500 p-1 shadow-sm border-b-2 border-b-red-900'
                          onClick={() => handleGeneratePdf()}
                        >
                          Extract PDF
                        </button>
                        <button
                          className='flex justify-center items-center rounded-md bg-green-500 p-1 shadow-sm border-b-2 border-b-green-900'
                          onClick={() => handleGenerateCsv()}
                        >
                          Extract CSV
                        </button>
                      </div>
                    </div>

                    <div className='mt-2 md:w-1/4 w-1/2'>
                      <span className='text-xs'>Status</span>
                      <select
                          id="status"
                          name="status"
                          ref={selectInput}
                          value={data.status}
                          onChange={(e) => setData('status', e.target.value as ETaskStatus)}
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                      >
                          <option value="all">Select a status...</option>
                          <option value="pending">Pending</option>
                          <option value="in progress">In Progress</option>
                          <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mt-2 md:w-1/4 w-1/2">
                      <span className='text-xs'>Date</span>
                      <div className='flex gap-4'>
                        <TextInput
                            id="initialDate"
                            type="date"
                            name="initialDate"
                            ref={nameInput}
                            value={data.initialDate}
                            onChange={(e) => setData('initialDate', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                        />
                        <TextInput
                            id="finalDate"
                            type="date"
                            name="finalDate"
                            ref={nameInput}
                            value={data.finalDate}
                            onChange={(e) => setData('finalDate', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-4 sm:p-6">
              <div className="grid gap-8">
                {tasks && tasks.map(task =>
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
                          className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-indigo-400'
                          onClick={() => handleTaskToAddUser(task)}
                        >
                          <svg className="feather feather-user-plus w-3 h-3 ml-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                        </button>
                        <button
                          className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-yellow-500'
                          onClick={() => handleUpdateTask(task)}
                        >
                          <svg className="feather feather-edit w-3 h-3 text-gray-900" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button
                          className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-red-500'
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <svg fill="#111827" className='w-3 h-3 text-gray-900' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 290 290" xmlSpace="preserve"><g id="XMLID_24_"><g id="XMLID_29_"><path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15 h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z" /></g><g id="XMLID_86_"><path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z" /></g></g></svg>
                        </button>
                      </div>
                    </div>

                    {task.users && task.users.length > 0 &&
                      <>
                        <hr />
                        <div className='mt-2 flex flex-col gap-3'>
                          <div className='bg-primary-100 text-gray-900 text-xs font-medium'>Responsáveis</div>
                          {task.users.map(user =>
                            <div className='flex flex-row items-center gap-3' key={user.id}>
                              <button
                                className='flex justify-center items-center h-6 w-6 rounded-md bg-indigo-700 text-white'
                                onClick={() => handleRemoveUserFromTask(task.id, user.id)}
                              >
                                <svg className="feather feather-user-minus ml-0.5 w-3 h-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                              </button>
                              <span className='text-gray-900 text-sm font-bold'>{user.name}</span>
                            </div>
                          )
                          }
                        </div>
                      </>
                    }

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

      {taskToAddUser &&
        <AddUserToTask
          cancelAddTaskToUser={handleCancelTaskToAddUser}
          openModal={openModalTaskUser}
          task={taskToAddUser}
          users={users}
        />
      }

      {userIdToRemoveFromTask && taskIdToRemoveUser &&
        <RemoveUserFromTask
          cancelRemotion={handleCancelRemoveUserFromTask}
          idUser={userIdToRemoveFromTask}
          idTask={taskIdToRemoveUser}
          openModal={openModalRemoveUserFromTask}
        />
      }
    </AuthenticatedLayout>
  )
}
