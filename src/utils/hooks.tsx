import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useMemo, useState } from "react"

const getUserToken = async({ getAccessToken }: {getAccessToken: any}) => {
    try {
        const accessToken = await getAccessToken();
        return {token: accessToken}
    } catch (e) {
        console.warn(e);
        return {error: `${e}`}
    }
}

interface TokenResponse {
    token ?: String,
    error ?: String
}

export const useGetAuth0Token = () => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0()
    const [tokenResponse, setTokenResponse] = useState<TokenResponse>()

    useEffect(() => {
        if(isAuthenticated && !tokenResponse) {
            getUserToken({ getAccessToken: getAccessTokenSilently })
            .then(response => setTokenResponse(response))
        }
    }, [isAuthenticated, tokenResponse, getAccessTokenSilently, setTokenResponse])

    return {
        token: tokenResponse?.token,
        error: tokenResponse?.error
    }
}
