import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CommonButton, SubmitButton } from './Button'
import './chatBox.scss'
import '../commons/buttonStyle.scss'

export const ChatBox = () => {
  const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message)
  }

  const [message, setMessage] = useState('')
  const [ws, setWebsocket] = useState<WebSocket>()

  const join = () => {
    const URL = "testURL"
    setWebsocket(() => {
        const ws = new WebSocket(URL);
        ws.onmessage = () => {};
        ws.onclose = () => {};
        return ws;
    })
  }

  return (
    <div className='chatContainer'>
        {ws 
        ? <div className='chat'>
            <Message user='Test' userColor='red' message='Test message'/>
            <Message user='Test1' userColor='blue' message='Test message1'/>
            <Message user='Test' userColor='red' message='Test message2'/>
        </div>
        : <div className='emptyChat'>
            <CommonButton className='mediumButton' text='Join chat' width={120}/>
        </div>
        }
        <form className='chatInputContainer' onSubmit={submitMessage}>
            <input onChange={(e) => setMessage(e.target.value)}></input>
            <SubmitButton className='smallButton' text='Submit' width={80}/>
        </form>
    </div>
  )
}

interface MessageProps {
    user: string,
    userColor: string,
    message: string
}

const Message = ({ user, userColor, message }: MessageProps) => (
    <div className='messageContainer'>
        <span style={{color: userColor, fontWeight:'bold'}} >{user}:</span>
        <span>{message}</span>
    </div>
)
