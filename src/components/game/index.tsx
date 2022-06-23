import React, { FormEvent, useEffect, useState } from 'react'
import { Board } from '../commons/PositioningBoard';
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import { ShipPosition } from '../commons/types';
import './gameStyle.scss'
import { Ship } from '../commons/Ship';
import { Positioning } from './positioning';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { Fire } from './fire';
import { WaitingForOponent } from './waitingForOponent';
import { useParams } from 'react-router-dom';


export const Game = () => {
    const gameID = useParams().gameID;
    const userId = localStorage.getItem("userId")
    const client = useStompClient()
    const [shipPositions, setShipPositions] = useState<ShipPosition[]>([
        {
            shifted: false,
            shipLength: 5
        },
        {
            shifted: false,
            shipLength: 4
        },
        {
            shifted: false,
            shipLength: 4
        },
        {
            shifted: false,
            shipLength: 3
        },
        {
            shifted: false,
            shipLength: 2
        },
    ])
    const [gameState, setGameState] = useState('WaitingForOponent')
    useEffect(() => {
        console.log("JOINING")
        client?.publish({
            destination:"/app/joinGame",
            body: JSON.stringify({userId: userId})
        })
    },[])

    useSubscription("/game/status", response => {
        const gameStatus = JSON.parse(response.body)
        console.log(gameStatus)
        setGameState(gameStatus.status)
    })

    const onSendPositions = () => {
        console.log('SENDING SHIPS POSITIONS')
        setGameState("Shooting")
    }

    const getScreen = () => {
        switch(gameState) {
            case 'WAITING_FOR_OPPONENT':
                return <WaitingForOponent/>
            case 'ORDERING_SHIPS':
                return <Positioning positions={shipPositions} setPositions={setShipPositions} sendPositions={onSendPositions}/>
            case 'Waiting' || 'WAITING_FOR_OPPONENT_TO_ORDER_SHIPS':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
            case 'Shooting':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
        }
    }


    return (
            <div className='gamePage'>
                <Navbar/>
                <div className='gameBackground'>
                    <>
                        {getScreen()}
                        <ChatBox userId={`${userId}`}/>
                    </>
                </div>
            </div>
    )
}
