export const API_ENDPOINT = {
    auth: {
        login: '/auth/login',
        requestOTP: '/auth/request-otp',
        verifyOTP: '/auth/verify-otp',
        completeRegister: '/auth/complete-register',
        refreshToken: '/auth/processNewToken',
        logout: '/auth/logout',
        verify: '/auth/verify'
    }
} as const