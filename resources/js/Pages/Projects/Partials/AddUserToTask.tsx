import { useRef, FormEventHandler, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';
import { Task, User } from '@/types';

interface IUpdateProjectProps {
  openModal: boolean
  cancelAddTaskToUser(): void
  task: Task
  users: User[] | []
}

export default function AddUserToTask({ openModal, cancelAddTaskToUser, task, users }: IUpdateProjectProps) {
  const selectInput = useRef<HTMLSelectElement>(null);

  let filteredUsers: User[] | [] = users.filter((user) => {
    return task.users && !task.users.find(sUser => sUser.id === user.id)
  });

  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors,
  } = useForm({
    userid: 0,
    taskid: task.id,
  });

  const handleAddUserToTask: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('taskuser.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => selectInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    cancelAddTaskToUser();
    reset();
  };

  return (
    <Modal show={openModal} onClose={closeModal}>
      <form onSubmit={handleAddUserToTask} className="p-6">
        <h2 className="text-lg font-medium text-gray-900">
          Add User to Task
        </h2>

        <div className='mt-6'>
          <InputLabel htmlFor="status" value="status" className="sr-only" />

          { filteredUsers.length === 0 &&
            <p className="mt-1 text-sm text-gray-600">
              All users are working in this task!
            </p>
          }
          {
            filteredUsers.length > 0 &&
            <select
              id="status"
              name="status"
              ref={selectInput}
              value={data.userid}
              onChange={(e) => setData('userid', Number(e.target.value))}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-3/4"
            >
              <option>Select a user...</option>
              {users && users.map(user =>
                <option key={user.email} value={user.id}>{user.name}</option>
              )}
            </select>
          }

          <InputError message={errors.userid} className="mt-2" />
        </div>

        <div className="mt-6 flex justify-end">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <SuccessButton className="ms-3" disabled={processing}>
            Add User
          </SuccessButton>
        </div>
      </form>
    </Modal>
  );
}
