import React, { FormEvent, useEffect, useState } from 'react'
import { Board } from '../commons/PositioningBoard';
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import { ShipPosition, Shot } from '../commons/types';
import './gameStyle.scss'
import { Ship } from '../commons/Ship';
import { Positioning } from './positioning';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { Fire } from './fire';
import { WaitingForOponent } from './waitingForOponent';
import { useParams } from 'react-router-dom';
import { convertCoordinateToNumber, convertPositionsToBackendPositions, getShipPositions } from '../../utils/utils';


export const Game = () => {
    const gameId = useParams().gameId;
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
    const [gameState, setGameState] = useState('LOADING')
    const [userState, setUserState] = useState('LOADING')
    const [myShots, setMyShots] = useState<Shot[]>([])
    const [enemyShots, setEnemyShots] = useState<Shot[]>([])

    useEffect(() => {
        if (client) {
            console.log('JOINING')
            client?.publish({
                destination:"/app/joinGame",
                body: JSON.stringify({gameId:gameId})
            })
        }
    },[client])

    useSubscription(`/game/${gameId}/status`, response => {
        const gameStatus = JSON.parse(response.body)
        console.log('GAME STATUS: ', gameStatus)
        setGameState(gameStatus.status)
    })

    useSubscription(`/game/${gameId}/user/${userId}`, response => {
        const userStatus = JSON.parse(response.body)
        console.log('USER STATUS: ', userStatus)
        setUserState(userStatus.status)
        const gameInfo = userStatus.gameRoomDto
        setShipPositions(gameInfo.myShips.map((ship:any) => getShipPositions(ship)))
        setMyShots(gameInfo.shootsTaken.map((shot:any) => ({block: convertCoordinateToNumber({x: shot.x, y: shot.y}), hit: shot.hit})))
        setEnemyShots(gameInfo.shotsReceived((shot:any) => ({block: convertCoordinateToNumber({x: shot.x, y: shot.y}), hit: shot.hit})))
    })

    const onSendPositions = () => {
        console.log('SENDING SHIPS POSITIONS')
        console.log(convertPositionsToBackendPositions(shipPositions))
        client?.publish({
            destination:"/app/set-ship-position",
            body: JSON.stringify({gameId, userId, positions: convertPositionsToBackendPositions(shipPositions)})
        })
    }

    const getPlayingScreen = () => {
        switch(userState) {
            case 'YOUR_TURN':
                return <Fire gameId={`${gameId}`} waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
            case 'OPPONENT_TURN':
                return <Fire gameId={`${gameId}`} waiting={true} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
        }
    }

    const getShipPositioningScreen = () => {
        switch(userState) {
            case 'ORDERING_SHIPS':
                return <Positioning positions={shipPositions} setPositions={setShipPositions} sendPositions={onSendPositions}/>
            case 'WAITING_FOR_OPPONENT_TO_ORDER_SHIPS':
                return <WaitingForOponent message='to order ships'/>
        }
    }

    const getScreen = () => {
        switch(gameState) {
            case 'LOADING':
                return <WaitingForOponent message='to join'/>
            case 'WAITING_FOR_OPPONENT':
                return <WaitingForOponent message='to join'/>
            case 'ORDERING_SHIPS':
                return getShipPositioningScreen()
            case 'PLAYING':
                return getPlayingScreen()
            case 'FINISHED':
                return <h1>FINISHED</h1>
        }
    }


    return (
            <div className='gamePage'>
                <Navbar/>
                <div className='gameBackground'>
                    <>
                        {getScreen()}
                        <ChatBox userId={`${userId}`} gameId={`${gameId}`}/>
                    </>
                </div>
            </div>
    )
}
