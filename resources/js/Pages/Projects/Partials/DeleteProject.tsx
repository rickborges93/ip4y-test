import { useRef, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

interface IDeleteProjectProps {
  openModal: boolean
  cancelProjectRemotion(): void
  idToRemove: string
}

export default function DeleteProject({ openModal, cancelProjectRemotion, idToRemove }: IDeleteProjectProps) {
    const nameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        description: '',
        conclusion_date: '',
    });

    const deleteProject: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('projects.destroy', idToRemove), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),

        });
    };

    const closeModal = () => {
        cancelProjectRemotion();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={deleteProject} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete this project?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Once this project is deleted, all of its resources and data will be permanently deleted.
              </p>

              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <DangerButton className="ms-3" disabled={processing}>
                      Delete Project
                  </DangerButton>
              </div>
          </form>
      </Modal>
    );
}
