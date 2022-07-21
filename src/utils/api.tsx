import { profile } from "console"

const URL = `${process.env.REACT_APP_BACKEND_HOST}`

interface ProfileData {
    email: string,
    games: [],
    id: string,
    name:string,
    streak: number,
    surname: string,
    winRate: number
  }

export const safeJoin = (a:string, b:string) => {
    return a.charAt(a.length-1) === '/' ? `${a}${b}` : `${a}/${b}`
}

export const getProfileData = async(token:String) => {
    const credentials = localStorage.getItem("credentials")
    return await fetch(`${safeJoin(URL, "profile")}/${credentials}`, {
        method: 'GET',
    })
}
export const joinNewGame = async(userId: String) => {
    return await fetch(`${safeJoin(URL, "game")}/join`, {
        method: 'POST',
        headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'}),
        body: JSON.stringify({ userId })
    })
}

export const createNewGame = async(userId: String) => {
    return await fetch(`${safeJoin(URL, "game")}/start-new-game`, {
        method: 'POST',
        headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'}),
        body: JSON.stringify({ userId })
    })
}
