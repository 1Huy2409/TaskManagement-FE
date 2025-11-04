export interface Workspace {
    id: string;
    title: string;
    description?: string;
    visibility: boolean;
    ownerId: string;
    created_at: string;
    updated_at: string;
}