import { LogoutButton } from "@/features/auth/ui/logout-button"

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <header className="border-b px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Management</h1>
                <LogoutButton />
            </header>
            <main className="p-6">
                <h2 className="text-xl">Welcome to our website. This is our home page!</h2>
            </main>
        </div>
    )
}