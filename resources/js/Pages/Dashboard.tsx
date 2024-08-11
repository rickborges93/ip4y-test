import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatDate } from '@/utils/formatDate';

export default function Dashboard({ auth, tasks }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex gap-2 p-6 text-gray-900 font-bold text-xl">
                            My tasks
                            <span className="bg-indigo-400 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full border border-gray-200 shadow-md">
                                {tasks.length}
                            </span>
                        </div>

                        <div className="w-full p-4 sm:p-6">
                            <div className="grid gap-8 lg:grid-cols-3">
                                { tasks && tasks.map(task =>
                                    <article className="p-4 bg-white rounded-lg border border-gray-200 shadow-md border-b-4 border-b-indigo-400" key={task.id}>
                                        <div className='flex gap-3 mb-3 justify-between'>
                                            <span className="bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 shadow-md">
                                                Task
                                            </span>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-gray-900 text-xs font-bold">End: {formatDate(new Date(task.validate_at))}</span>
                                            </div>
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"><a href="#">{task.title}</a></h2>
                                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{task.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className='flex gap-1 items-center'>
                                                <span className="bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 shadow-md">
                                                    Project
                                                </span>
                                                <span className='text-gray-900 text-xs font-bold'>{task.project?.name}</span>
                                            </div>
                                            <a href={route('projects.show', task.project?.id)} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                See project
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
        </AuthenticatedLayout>
    );
}
