import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';
import { Project } from '@/types';

interface IUpdateProjectProps {
  openModal: boolean
  cancelProjectUpdate(): void
  project: Project
}

export default function UpdateProject({ openModal, cancelProjectUpdate, project }: IUpdateProjectProps) {
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        name: project.name,
        description: project.description,
        conclusion_date: project.conclusion_date.toString(),
    });

    const handleUpdateProject: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('projects.update', project.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        cancelProjectUpdate();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={handleUpdateProject} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                  Update Project
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
                      Update Project
                  </SuccessButton>
              </div>
          </form>
      </Modal>
    );
}
