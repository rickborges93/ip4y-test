import { useRef, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

interface IDeleteTaskProps {
  openModal: boolean
  cancelTaskRemotion(): void
  idToRemove: string
}

export default function DeleteTask({ openModal, cancelTaskRemotion, idToRemove }: IDeleteTaskProps) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm();

    const deleteTask: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('tasks.destroy', idToRemove), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        cancelTaskRemotion();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={deleteTask} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete this task?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Once this task is deleted, all of its resources and data will be permanently deleted.
              </p>

              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <DangerButton className="ms-3" disabled={processing}>
                      Delete Task
                  </DangerButton>
              </div>
          </form>
      </Modal>
    );
}
