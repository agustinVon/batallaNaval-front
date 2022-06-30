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
import { useNavigate, useParams } from 'react-router-dom';
import { convertCoordinateToNumber, convertNumberToCoordinates, convertPositionsToBackendPositions, getShipPositions } from '../../utils/utils';
import { WinLoseScreen } from './winLoseScreen';


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
    const navigate = useNavigate()

    useEffect(() => {
        if (client) {
            console.log('JOINING')
            client?.publish({
                destination:"/app/joinGame",
                body: JSON.stringify({gameId:gameId, userId: userId})
            })
        }
    },[client])

    useSubscription(`/game/${gameId}/status`, response => {
        const gameStatus = JSON.parse(response.body)
        console.log('GAME STATUS: ', gameStatus)
        setGameState(gameStatus.status)
    })

    console.log('SHOTS RECEIVED', enemyShots)

    useSubscription(`/game/${gameId}/user/${userId}`, response => {
        console.log('RESPONSE', response)
        const userStatus = JSON.parse(response.body)
        console.log('USER STATUS: ', userStatus)
        setUserState(userStatus.status)
        const gameInfo = userStatus.gameRoomDto.board
        if (gameInfo) {
            setShipPositions(gameInfo.myShips.map((ship:any) => getShipPositions(ship)))
            setMyShots(gameInfo.shootsTaken.map((shot:any) => ({block: convertCoordinateToNumber({x: shot.x, y: shot.y}), hit: shot.hit})))
            setEnemyShots(gameInfo.shotsReceived.map((shot:any) => ({block: convertCoordinateToNumber({x: shot.x, y: shot.y}), hit: shot.hit})))
        }
    })

    const onSendPositions = () => {
        console.log('SENDING SHIPS POSITIONS')
        console.log(convertPositionsToBackendPositions(shipPositions))
        client?.publish({
            destination:"/app/set-ship-position",
            body: JSON.stringify({gameId, userId, positions: convertPositionsToBackendPositions(shipPositions)})
        })
    }

    const onFire = (block: number) => {
        console.log('FIRING')
        console.log(`/game/${gameId}/user/${userId}`)
        const coordinate = convertNumberToCoordinates(block)
        client?.publish({
            destination:"/app/shoot",
            body: JSON.stringify({gameId, userId, x: coordinate.x, y: coordinate.y})
        })
    }

    const goHome = () => {
        navigate('/home')
    }

    const getPlayingScreen = () => {
        switch(userState) {
            case 'YOUR_TURN':
                return <Fire waiting={false} positions={shipPositions} myShots={myShots} enemyShots={enemyShots} onFire={onFire}/>
            case 'OPPONENT_TURN':
                return <Fire waiting={true} positions={shipPositions} myShots={myShots} enemyShots={enemyShots}/>
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

    const getWinLoseScreen = () => {
        switch(userState) {
            case 'WON':
                return <WinLoseScreen hasWon={true} goHome={goHome}/>
            case 'LOST':
                return <WinLoseScreen hasWon={false} goHome={goHome}/>
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
                return getWinLoseScreen()
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
