import { useContext, useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BoardDialogContext } from "../shared/context"
import type { Board } from "@/types/board/board"

interface EditBoardDialogProps {
    boards: Board[];
    onUpdate: (boardId: string, data: { title: string; description: string }) => Promise<void>;
}

export function EditBoardDialog({ boards, onUpdate }: EditBoardDialogProps) {
    const { selectedBoardId, dialogType, closeDialog } = useContext(BoardDialogContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const isOpen = dialogType === 'edit' && selectedBoardId !== null;
    const selectedBoard = boards.find(b => b.id === selectedBoardId);

    useEffect(() => {
        if (selectedBoard) {
            setTitle(selectedBoard.title);
            setDescription(selectedBoard.description || "");
        }
    }, [selectedBoard]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBoardId) return;

        try {
            setLoading(true);
            await onUpdate(selectedBoardId, { title, description });
            closeDialog();
        } catch (error) {
            console.error("Failed to update board:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Board</DialogTitle>
                        <DialogDescription>
                            Make changes to your board here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Board title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Board description (optional)"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
