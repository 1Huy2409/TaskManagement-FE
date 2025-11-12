import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, LayoutDashboard, Users } from "lucide-react"
import type { Workspace } from "@/types/workspace/workspace"
import type { Board } from "@/types/board/board"
import { BoardCardMenu } from "@/features/dashboard/ui/board-card-menu"

interface WorkspaceCardProps {
  workspace: Workspace;
  boards: Board[];
  onBoardClick: (boardId: string) => void;
  onAddBoard: (workspaceId: string) => void;
}

export function WorkspaceCard({ workspace, boards, onBoardClick, onAddBoard }: WorkspaceCardProps) {
  return (
    <div className="space-y-4">
      {/* Workspace Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {/* Workspace Icon */}
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          
          {/* Workspace Info */}
          <div>
            <h2 className="text-xl font-semibold">{workspace.title}</h2>
            {workspace.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {workspace.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {boards.length} {boards.length === 1 ? 'board' : 'boards'}
            </p>
          </div>
        </div>

        {/* Add Board Button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onAddBoard(workspace.id)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Board
        </Button>
      </div>

      {/* Boards Grid */}
      {boards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {boards.map((board) => (
            <Card
              key={board.id}
              className="group cursor-pointer hover:shadow-md hover:border-primary/50 transition-all relative"
              onClick={() => onBoardClick(board.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Board Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{board.title}</h3>
                      {board.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {board.description}
                        </p>
                      )}
                    </div>
                    {/* Menu Button */}
                    <div className="absolute top-2 right-2">
                      <BoardCardMenu boardId={board.id} />
                    </div>
                  </div>

                  {/* Board Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <LayoutDashboard className="w-3 h-3" />
                      <span>{board.listCount || 0} lists</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{board.memberCount || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}