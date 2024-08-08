import { useRef, useState, FormEventHandler, Dispatch, SetStateAction } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';
import {ETaskStatus} from '@/types'

interface ICreateNewTaskProps {
  openModal: boolean
  cancelCreation(): void
  project_id: string
}

export default function CreateNewTask({ openModal, cancelCreation, project_id }: ICreateNewTaskProps) {
    const nameInput = useRef<HTMLInputElement>(null);

    const pendingStatus = ETaskStatus[ETaskStatus.pending]

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        description: '',
        validate_at: '',
        status: pendingStatus,
        project_id: project_id,
    });

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        cancelCreation();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={createProject} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                  Create New Task
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
                  <InputLabel htmlFor="validate_at" value="Description" className="sr-only" />

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


              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <SuccessButton className="ms-3" disabled={processing}>
                      Create Task
                  </SuccessButton>
              </div>
          </form>
      </Modal>
    );
}
