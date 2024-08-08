import { useRef, useState, FormEventHandler, Dispatch, SetStateAction } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';

interface ICreateNewProjectProps {
  openModal: boolean
  cancelProjectCreation(): void
}

export default function CreateNewProject({ openModal, cancelProjectCreation }: ICreateNewProjectProps) {
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        description: '',
        conclusion_date: '',
    });

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        cancelProjectCreation();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={createProject} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                  Create New Project
              </h2>

              <div className="mt-6">
                  <InputLabel htmlFor="name" value="Name" className="sr-only" />

                  <TextInput
                      id="name"
                      type="text"
                      name="name"
                      ref={nameInput}
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="mt-1 block w-3/4"
                      isFocused
                      placeholder="Name"
                  />

                  <InputError message={errors.name} className="mt-2" />
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
                  <InputLabel htmlFor="conclusion_date" value="Description" className="sr-only" />

                  <TextInput
                      id="conclusion_date"
                      type="datetime-local"
                      name="conclusion_date"
                      ref={nameInput}
                      value={data.conclusion_date}
                      onChange={(e) => setData('conclusion_date', e.target.value)}
                      className="mt-1 block w-3/4"
                      isFocused
                  />

                  <InputError message={errors.conclusion_date} className="mt-2" />
              </div>

              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <SuccessButton className="ms-3" disabled={processing}>
                      Create Project
                  </SuccessButton>
              </div>
          </form>
      </Modal>
    );
}
