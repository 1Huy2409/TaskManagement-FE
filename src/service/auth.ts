import api from "./api";

export const login = async (username: string, password: string) => {
    const credential = { username, password }
    const res = await api.post('/auth/login', credential)
    return res.data
}
export const refreshToken = async () => {
    const res = await api.post('/auth/processNewToken')
    return res.data
}