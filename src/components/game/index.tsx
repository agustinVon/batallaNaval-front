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
import { convertPositionsToBackendPositions } from '../../utils/utils';


export const Game = () => {
    const gameId = useParams().gameId;
    console.log(`GAME ID: ${gameId}`)
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
    console.log(shipPositions)

    useEffect(() => {
        console.log("JOINING")
        client?.publish({
            destination:"/app/joinGame",
            body: JSON.stringify({gameId:gameId})
        })
    },[])

    useSubscription(`/game/${gameId}/status`, response => {
        const gameStatus = JSON.parse(response.body)
        console.log(gameStatus)
        setGameState(gameStatus.status)
    })

    const onSendPositions = () => {
        console.log('SENDING SHIPS POSITIONS')
        setGameState("Shooting")
        console.log(convertPositionsToBackendPositions(shipPositions))
        // client?.publish({
        //     destination:"/set-ship-position",
        //     body: JSON.stringify({gameId, userId, shipPositions})
        // })
    }

    const getScreen = () => {
        switch(gameState) {
            case 'WAITING_FOR_OPPONENT':
                return <WaitingForOponent/>
            case 'ORDERING_SHIPS':
                return <Positioning positions={shipPositions} setPositions={setShipPositions} sendPositions={onSendPositions}/>
            case 'WAITING_FOR_OPPONENT_TO_ORDER_SHIPS':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
            case 'PLAYING':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
            case 'FINISHED':
                return <h1>FINISHED</h1>
        }
    }


    return (
            <div className='gamePage'>
                <Navbar/>
                <div className='gameBackground'>
                    <>
                        {/*getScreen()*/}
                        <Positioning positions={shipPositions} setPositions={setShipPositions} sendPositions={onSendPositions}/>
                        <ChatBox userId={`${userId}`} gameId={`${gameId}`}/>
                    </>
                </div>
            </div>
    )
}
