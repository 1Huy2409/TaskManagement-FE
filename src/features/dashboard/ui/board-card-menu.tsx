import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useContext } from "react"
import { BoardDialogContext } from "../shared/context"

interface BoardCardMenuProps {
    boardId: string;
}

export function BoardCardMenu({ boardId }: BoardCardMenuProps) {
    const { openDialog } = useContext(BoardDialogContext);

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        openDialog(boardId, 'edit');
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        openDialog(boardId, 'delete');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit Board</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={handleDelete} 
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Board</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}