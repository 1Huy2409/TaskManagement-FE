export const API_ENDPOINT = {
    auth: {
        login: '/auth/login',
        requestOTP: '/auth/request-otp',
        verifyOTP: '/auth/verify-otp',
        completeRegister: '/auth/complete-register',
        refreshToken: '/auth/processNewToken',
        logout: '/auth/logout',
        verify: '/auth/verify'
    },
    workspace: {
        getAll: '/workspaces',
        getBoards: (workspaceId: string) => `/workspaces/${workspaceId}/boards`,
    },
} as const