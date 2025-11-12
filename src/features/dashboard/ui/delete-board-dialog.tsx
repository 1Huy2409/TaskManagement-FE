import { useContext, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BoardDialogContext } from "../shared/context"
import type { Board } from "@/types/board/board"

interface DeleteBoardDialogProps {
    boards: Board[];
    onDelete: (boardId: string) => Promise<void>;
}

export function DeleteBoardDialog({ boards, onDelete }: DeleteBoardDialogProps) {
    const { selectedBoardId, dialogType, closeDialog } = useContext(BoardDialogContext);
    const [loading, setLoading] = useState(false);

    const isOpen = dialogType === 'delete' && selectedBoardId !== null;
    const selectedBoard = boards.find(b => b.id === selectedBoardId);

    const handleDelete = async () => {
        if (!selectedBoardId) return;

        try {
            setLoading(true);
            await onDelete(selectedBoardId);
            closeDialog();
        } catch (error) {
            console.error("Failed to delete board:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Board</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete "{selectedBoard?.title}"? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
