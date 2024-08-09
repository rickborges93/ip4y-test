import { useRef, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

interface IRemoveUserFromTaskProps {
  openModal: boolean
  cancelRemotion(): void
  idTask: string
  idUser: number
}

export default function RemoveUserFromTask({ openModal, cancelRemotion, idTask, idUser }: IRemoveUserFromTaskProps) {

    const {
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const deleteUserFromTask: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('taskuser.destroy', [idTask, idUser]), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        cancelRemotion();
        reset();
    };

    return (
      <Modal show={openModal} onClose={closeModal}>
          <form onSubmit={deleteUserFromTask} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to remove this user from this task?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Once this user is removed from task, you can add again.
              </p>

              <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                  <DangerButton className="ms-3" disabled={processing}>
                      Remove User
                  </DangerButton>
              </div>
          </form>
      </Modal>
    );
}
