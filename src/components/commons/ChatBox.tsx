import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CommonButton, SubmitButton } from './Button'
import './chatBox.scss'
import '../commons/buttonStyle.scss'

interface ChatProps {
  ws : WebSocket,
  userId: string
}

interface MessageData {
  gameId: string,
  senderId: string,
  recipientId: string,
  content: string
}

export const ChatBox = ({ws, userId}:ChatProps) => {
  const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    console.log("SUBMIT")
    e.preventDefault();
    // const message:MessageData = {gameId: '', senderId: `${user?.sub}`, recipientId: `${}` }
    console.log({gameID:null, senderId: userId, recipientId: null, content: message })
    ws.send(JSON.stringify({gameID:null, senderId: userId, recipientId: null, content: message }))
  }

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    <Message user='Test' userColor='red' message='Test message'/>,
    <Message user='Test1' userColor='blue' message='Test message1'/>,
    <Message user='Test' userColor='red' message='Test message2'/>
  ])

  ws.onmessage = (m) => {
    console.log(m)
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
