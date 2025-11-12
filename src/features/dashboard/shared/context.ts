import { createContext } from "react";

export type DialogType = 'edit' | 'delete' | null;

export interface BoardDialogContextType {
    selectedBoardId: string | null;
    dialogType: DialogType;
    openDialog: (boardId: string, type: DialogType) => void;
    closeDialog: () => void;
}

export const BoardDialogContext = createContext<BoardDialogContextType>({
    selectedBoardId: null,
    dialogType: null,
    openDialog: () => { },
    closeDialog: () => { }
});