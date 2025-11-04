import { useEffect, useState, lazy, Suspense } from "react"
import { api } from "@/shared/api/api.shared"
import type { Workspace } from "@/types/workspace/workspace"
import type { Board } from "@/types/board/board"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Component } from "lucide-react"
import { ComponentLoader } from "@/components/loading-component"
// import { useNavigate } from "react-router-dom"
const WorkspaceCard = lazy(() => import('@/components/workspace-card').then(module => ({ default: module.WorkspaceCard })))
interface WorkspaceWithBoards {
  workspace: Workspace;
  boards: Board[];
}

export default function DashboardHome() {
  // const navigate = useNavigate()
  const [workspacesData, setWorkspacesData] = useState<WorkspaceWithBoards[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkspacesAndBoards()
  }, [])

  const fetchWorkspacesAndBoards = async () => {
    try {
      setLoading(true)
      setError(null)

      const workspacesResponse = await api.workspace.getAll<Workspace[]>()
      const workspaces = workspacesResponse.responseObject

      if (!workspaces || workspaces.length === 0) {
        setWorkspacesData([])
        return
      }

      const workspacesWithBoards = await Promise.all(
        workspaces.map(async (workspace) => {
          try {
            const boardsResponse = await api.workspace.getBoards<Board[]>(workspace.id)
            return {
              workspace,
              boards: boardsResponse.responseObject || []
            }
          } catch (err) {
            console.error(`Failed to fetch boards for workspace ${workspace.id}:`, err)
            return {
              workspace,
              boards: []
            }
          }
        })
      )

      setWorkspacesData(workspacesWithBoards)
    } catch (err: any) {
      console.error('Failed to fetch workspaces:', err)
      setError(err?.response?.data?.message || 'Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }

  const handleBoardClick = (boardId: string) => {
    // TODO: Navigate to board details page
    console.log('Navigate to board:', boardId)
  }

  const handleCreateWorkspace = () => {
    // TODO: Open create workspace modal
    console.log('Create workspace clicked')
  }

  const handleAddBoard = (workspaceId: string) => {
    // TODO: Open create board modal
    console.log('Add board to workspace:', workspaceId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading workspaces...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchWorkspacesAndBoards}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your workspaces and boards
          </p>
        </div>
        <Button onClick={handleCreateWorkspace}>
          <Plus className="w-4 h-4 mr-2" />
          New Workspace
        </Button>
      </div>

      {/* Workspaces List */}
      {workspacesData.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">No workspaces yet</h3>
            <p className="text-muted-foreground">
              Create your first workspace to get started
            </p>
          </div>
          <Button onClick={handleCreateWorkspace}>
            <Plus className="w-4 h-4 mr-2" />
            Create Workspace
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <Suspense fallback={<ComponentLoader />}>
          {workspacesData.map(({ workspace, boards }) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              boards={boards}
              onBoardClick={handleBoardClick}
              onAddBoard={handleAddBoard}
            />
          ))}
          </Suspense>
        </div>
      )}
    </div>
  )
}