export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    conclusion_date: Date;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    validate_at: Date;
    status: ETaskStatus;
}

export enum ETaskStatus {
    'pending' = 'pending',
    'in progress' = 'in progress',
    'completed' = 'completed',
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    projects: Project[];
    project: Project;
    tasks: Task[];
};
