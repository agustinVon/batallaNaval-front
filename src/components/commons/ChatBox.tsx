import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CommonButton, SubmitButton } from './Button'
import './chatBox.scss'
import '../commons/buttonStyle.scss'
import { useSubscription, useStompClient } from "react-stomp-hooks";

interface ChatProps {
  userId: string
}

interface MessageData {
  senderName: string,
  content: string
}

export const ChatBox = ({userId}:ChatProps) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageData[]>([])
  const client = useStompClient()
  const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    if (client) {
      console.log('Submited')
      client.publish({
        destination:"/secured/room",
        body: JSON.stringify({senderId: userId, content: message })
      })
    }
  }

  useSubscription("/game/chat", message => {
    console.log(message.body)
  })

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
