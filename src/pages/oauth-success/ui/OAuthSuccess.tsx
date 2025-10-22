import { api } from "@/shared/api/api.shared"

export default function OAuthSuccess() {
    // call api refresh token then navigate to home
    const handleOauthSuccess = async () => {
        const data = await api.auth.refreshToken();
        const accessToken = data.responseObject.accessToken;
        window.localStorage.setItem('accessToken', accessToken);
        window.location.href = '/#/home';
    }
    handleOauthSuccess();
    return(<></>)
}