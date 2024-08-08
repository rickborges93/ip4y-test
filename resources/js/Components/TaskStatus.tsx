import { ETaskStatus } from "../types";

interface ITaskStatusProps {
    status: ETaskStatus
}

export default function TaskStatus({ status }: ITaskStatusProps) {
    const statusClass = {
        [ETaskStatus.pending] : 'bg-green-300',
        [ETaskStatus["in progress"]]: 'bg-yellow-300',
        [ETaskStatus.completed]  : 'bg-red-300',
    }[ETaskStatus[status]];

    return <span className={`bg-primary-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-1.5 rounded border border-gray-200 shadow-md ${statusClass}`}>{status}</span>
}
