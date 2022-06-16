const URL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

export const getProfileData = async(token:String) => {
    const credentials = localStorage.getItem("credentials")
    return await fetch(`${URL}/profile/${credentials}`, {
        method: 'GET',
        
    })
}
