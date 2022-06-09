const URL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

export const getProfileData = async(token:String) => {
    return await fetch(`${URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${token}`
        }
    })
}
