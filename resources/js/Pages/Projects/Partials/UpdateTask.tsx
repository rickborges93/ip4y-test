import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';
import { ETaskStatus, Task } from '@/types';

interface IUpdateTaskProps {
  openModal: boolean
  cancelTaskUpdate(): void
  task: Task
}

export default function UpdateTask({ openModal, cancelTaskUpdate, task }: IUpdateTaskProps) {
    const nameInput = useRef<HTMLInputElement>(null);
    const selectInput = useRef<HTMLSelectElement>(null);

    const {
        data,
        setData,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        title: task.title,
        description: task.description,
        validate_at: task.validate_at.toString(),
        status: task.status,
    });

    const handleUpdateTask: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('tasks.update', task.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        cancelTaskUpdate();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={handleUpdateTask} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                  Update Task
              </h2>

              <div className="mt-6">
                  <InputLabel htmlFor="title" value="Title" className="sr-only" />

                  <TextInput
                      id="title"
                      type="text"
                      name="title"
                      ref={nameInput}
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      className="mt-1 block w-3/4"
                      isFocused
                      placeholder="Title"
                  />

                  <InputError message={errors.title} className="mt-2" />
              </div>

              <div className="mt-6">
                  <InputLabel htmlFor="description" value="Description" className="sr-only" />

                  <TextInput
                      id="description"
                      type="text"
                      name="description"
                      ref={nameInput}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      className="mt-1 block w-3/4"
                      isFocused
                      placeholder="Description"
                  />

                  <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-6">
                  <InputLabel htmlFor="validate_at" value="Validate At" className="sr-only" />

                  <TextInput
                      id="validate_at"
                      type="datetime-local"
                      name="validate_at"
                      ref={nameInput}
                      value={data.validate_at}
                      onChange={(e) => setData('validate_at', e.target.value)}
                      className="mt-1 block w-3/4"
                      isFocused
                  />

                  <InputError message={errors.validate_at} className="mt-2" />
              </div>

              <div className='mt-6'>
                <InputLabel htmlFor="status" value="status" className="sr-only" />

                <select
                    id="status"
                    name="status"
                    ref={selectInput}
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value as ETaskStatus)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-3/4"
                >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <SuccessButton className="ms-3" disabled={processing}>
                      Update Task
                  </SuccessButton>
              </div>
          </form>
      </Modal>
    );
}
