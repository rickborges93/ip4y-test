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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    projects: Project[];    
};
