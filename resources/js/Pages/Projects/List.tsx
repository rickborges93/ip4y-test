import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Project } from '@/types';
import SuccessButton from '@/Components/SuccessButton';
import CreateNewProject from './Partials/CreateNewProject';
import { formatDate } from '@/utils/formatDate';
import DeleteProject from './Partials/DeleteProject';
import UpdateProject from './Partials/UpdateProject';

export default function ProjectsList ({ auth, projects }: PageProps<{ }>) {
  const [openModalProjectCreation, setOpenModalProjectCreation] = useState(false);
  const [openModalProjectRemotion, setOpenModalProjectRemotion] = useState(false);
  const [openModalProjectUpdate, setOpenModalProjectUpdate] = useState(false);

  const [projectIdToRemove, setProjectIdToRemove] = useState<null | string>(null)
  const [projectUpdate, setProjectUpdate] = useState<null | Project>(null)

  const confirmProjectCreation = () => {
    setOpenModalProjectCreation(true);
  };

  const cancelProjectCreation = () => {
    setOpenModalProjectCreation(false);
  }

  const confirmProjectRemotion = (id: string) => {
    setProjectIdToRemove(id);
    setOpenModalProjectRemotion(true);
  };

  const cancelProjectRemotion = () => {
    setProjectIdToRemove(null);
    setOpenModalProjectRemotion(false);
  }

  const confirmProjectUpdate = (project: Project) => {
    setProjectUpdate(project);
    setOpenModalProjectUpdate(true);
  };

  const cancelProjectUpdate = () => {
    setProjectUpdate(null);
    setOpenModalProjectUpdate(false);
  }

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between'>
                          <div className="p-6 text-gray-900 font-bold text-xl">Projects List</div>

                          <div className="flex justify-end mr-4 mt-4 mb-6">
                            <SuccessButton onClick={() => confirmProjectCreation()} className="ms-3">
                              New Project
                            </SuccessButton>
                          </div>
                        </div>

                        <div className="w-full p-4 sm:p-6">
                          <div className="grid gap-8 lg:grid-cols-3">
                            { projects && projects.map(project =>
                                <article className="p-4 bg-white rounded-lg border border-gray-200 shadow-md border-b-4 border-b-indigo-400" key={project.id}>
                                  <div className='flex gap-3 mb-3 justify-between'>
                                    <span className="bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 shadow-md">
                                          Project
                                      </span>
                                    <div className='flex gap-2 justify-end'>
                                      <button
                                        className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-yellow-500'
                                        onClick={() => confirmProjectUpdate(project)}
                                      >
                                        <svg className="feather feather-edit w-3 h-3 text-gray-900" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                      </button>
                                      <button
                                        className='flex justify-center items-center mb-2 h-6 w-6 rounded-full bg-red-500'
                                        onClick={() => confirmProjectRemotion(project.id)}
                                      >
                                        <svg fill="#111827" className='w-3 h-3 text-gray-900' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 290 290" xmlSpace="preserve"><g id="XMLID_24_"><g id="XMLID_29_"><path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15 h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"/></g><g id="XMLID_86_"><path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z"/></g></g></svg>
                                      </button>
                                    </div>

                                  </div>
                                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"><a href="#">{project.name}</a></h2>
                                  <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{project.description}</p>
                                  <div className="flex justify-between items-center">
                                      <div className="flex items-center space-x-4">
                                        <span className="text-gray-900 text-xs font-bold">End: {formatDate(new Date(project.conclusion_date))}</span>
                                      </div>
                                      <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                          See tasks
                                          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                      </a>
                                  </div>
                                </article>
                              )
                            }
                          </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateNewProject
              openModal={openModalProjectCreation}
              cancelProjectCreation={cancelProjectCreation}
            />

            {projectIdToRemove &&
              <DeleteProject
                openModal={openModalProjectRemotion}
                cancelProjectRemotion={cancelProjectRemotion}
                idToRemove={projectIdToRemove}
              />
            }

            {projectUpdate &&
              <UpdateProject
                openModal={openModalProjectUpdate}
                cancelProjectUpdate={cancelProjectUpdate}
                project={projectUpdate}
              />
            }
        </AuthenticatedLayout>
  )
}
