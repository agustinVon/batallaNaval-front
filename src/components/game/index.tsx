import React, { FormEvent, useEffect, useState } from 'react'
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import './gameStyle.scss'
import { ShipList } from './ShipList';


export const Game = () => {


    const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message)
    }

    const [message, setMessage] = useState('')
    const [ws, setWebsocket] = useState<WebSocket>()


    useEffect(() => {
        if(!ws) {
            console.log('connect')
            const URL = "ws://localhost:3010/gameChat/chat"
            setWebsocket(() => {
            const ws = new WebSocket(URL);
            ws.onmessage = () => {};
            ws.onclose = () => {};
            return ws;
            })
        }
    }, [ws])

    return (
        <div className='gamePage'>
        <Navbar/>
        <div className='gameBackground'>
            {!!ws
            ? <>
            <ShipList/>
            <ChatBox ws={ws}/>
            </>
            : <>
            <ShipList/>
            </>
            }
        </div>
      </div>
    )
}
