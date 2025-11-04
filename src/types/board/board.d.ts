export interface Board {
    id: string;
    title: string;
    description?: string;
    visibility: boolean;
    workspaceId: string;
    listCount?: number;
    memberCount?: number;
    created_at: string;
    updated_at: string;
}