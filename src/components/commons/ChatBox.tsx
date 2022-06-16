import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CommonButton, SubmitButton } from './Button'
import './chatBox.scss'
import '../commons/buttonStyle.scss'
import { useSubscription, useStompClient } from "react-stomp-hooks";

interface ChatProps {
  userId: string
}

interface MessageData {
  gameId: string,
  senderId: string,
  recipientId: string,
  content: string
}

export const ChatBox = ({userId}:ChatProps) => {
  const client = useStompClient()
  const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    if (client) {
      client.publish({
        destination:"/game/chat",
        body: JSON.stringify({gameID:null, senderId: userId, recipientId: null, content: message })
      })
    }
  }

  const [message, setMessage] = useState('')

  useSubscription("/game/chat", message => console.log(message))

  return (
    <div className='chatContainer'>
        <div className='chat'>
            <Message user='Test' userColor='red' message='Test message'/>
            <Message user='Test1' userColor='blue' message='Test message1'/>
            <Message user='Test' userColor='red' message='Test message2'/>
        </div>
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
