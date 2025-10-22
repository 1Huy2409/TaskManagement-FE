import { CompleteForm } from "@/features/auth/ui/Register/complete-form"

function CompleteRegister() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CompleteForm />
      </div>
    </div>
  )
}

export default CompleteRegister
