import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CommonButton, SubmitButton } from './Button'
import './chatBox.scss'
import '../commons/buttonStyle.scss'
import { useSubscription, useStompClient } from "react-stomp-hooks";

interface ChatProps {
  userId: string,
  gameId: string
}

interface MessageData {
  senderName: string,
  content: string
}

export const ChatBox = ({userId, gameId}:ChatProps) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageData[]>([])
  const client = useStompClient()
  const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (client) {
      console.log('Submited', gameId)
      client.publish({
        destination:"/app/secured/room",
        body: JSON.stringify({gameId, senderId: userId, content: message })
      })
    }
  }

  useSubscription(`/game/${gameId}/chat`, response => {
    const messageReceived = JSON.parse(response.body)
    setMessages(prevValue => [...prevValue, ({senderName: messageReceived.senderName, content: messageReceived.content})])
  })

  return (
    <div className='chatContainer'>
        <div className='chat'>
          {messages.map((mes, index) => (
            <Message key={index} user={mes.senderName} userColor='blue' message={mes.content}/>
          ))}
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
