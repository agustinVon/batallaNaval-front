const URL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

interface ProfileData {
    email: string,
    games: [],
    id: string,
    name:string,
    streak: number,
    surname: string,
    winRate: number
  }
export const getProfileData = async(token:String) => {
    const credentials = localStorage.getItem("credentials")
    return await fetch(`${URL}/profile/${credentials}`, {
        method: 'GET',
    })
}
export const joinNewGame = async(userId: String) => {
    return await fetch(`${URL}/gameRoom/join`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    })
}
