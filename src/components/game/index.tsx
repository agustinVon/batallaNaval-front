import React, { FormEvent, useEffect, useState } from 'react'
import { Board } from '../commons/PositioningBoard';
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import { ShipPosition } from '../commons/types';
import './gameStyle.scss'
import { Ship } from '../commons/Ship';
import { Positioning } from './positioning';
import { StompSessionProvider, useStompClient } from 'react-stomp-hooks';
import { Fire } from './fire';


export const Game = () => {
    const userId = localStorage.getItem("userId")
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
    const [gameState, setGameState] = useState('Positioning')

    const onSendPositions = () => {
        // if(ws && ws.OPEN) {
        //     ws.send(JSON.stringify({
        //         userId: userId,
        //         positions: shipPositions.map(pos => pos.blocksOccupied?.map(block => ({x: block % 10, y: block/10}))).flat()
        //     }))
        // }
        setGameState("Waiting")
    }

    const getScreen = () => {
        switch(gameState) {
            case 'Positioning':
                return <Positioning positions={shipPositions} setPositions={setShipPositions} sendPositions={onSendPositions}/>
            case 'Waiting':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
            case 'Shooting':
                return <Fire waiting={false} positions={shipPositions} myShots={[{block: 30, hit: true}]} enemyShots={[{block: 47, hit: false}]}/>
        }
    }


    return (
        <StompSessionProvider url='http://localhost:8080/secured/room'>
            <div className='gamePage'>
                <Navbar/>
                <div className='gameBackground'>
                    <>
                        {getScreen()}
                        <ChatBox userId={`${userId}`}/>
                    </>
                </div>
            </div>
        </StompSessionProvider>
    )
}
