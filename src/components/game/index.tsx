import React, { FormEvent, useEffect, useState } from 'react'
import { Board } from '../commons/Board';
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import { ShipPosition } from '../commons/types';
import './gameStyle.scss'
import { Ship } from '../commons/Ship';


export const Game = () => {

    console.log('RUN')

    const [shipPositions, setShipPositions] = useState<ShipPosition[]>([
        {
            shifted: false,
            shipLength: 5
        },
        {
            shifted: false,
            shipLength: 5
        },
        {
            shifted: false,
            shipLength: 5
        },
        {
            shifted: false,
            shipLength: 5
        },
        {
            shifted: false,
            shipLength: 5
        },
    ])
    const [shipSelected, setShipSelected] = useState<number>()

    const submitMessage = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message)
    }

    const [message, setMessage] = useState('')
    const [ws, setWebsocket] = useState<WebSocket>()

    console.log('run')

    const setShipPosition = (block:number) => {
        setShipPositions(shipPositions.map((position, index) => {
            if (index === shipSelected) {
                return {
                    ...position,
                    block: block
                }
            }
            else {
                return position
            }
        }))
    }


    useEffect(() => {
        if(!ws) {
            console.log('connect')
            const URL = "ws://localhost:3010/gameChat/chat"
            setWebsocket(() => {
            const ws = new WebSocket(URL);
            ws.onmessage = () => {};
            ws.onclose = () => {};
            return ws;
            })
        }
    }, [ws])

    const selectShipInBlock = (block:number) => {
        setShipSelected(shipPositions.findIndex(position => position.block === block))
    }

    return (
        <div className='gamePage'>
        <Navbar/>
        <div className='gameBackground'>
            {!!ws
            ? <>
            <div>
            <h4>Ships</h4>
                <ul>
                    {shipPositions.map((position, index) => (
                        !position.block && <li key={index}>
                            <Ship select={() => setShipSelected(index)} length={position.shipLength}/>
                        </li>
                    ))}
                </ul>
            </div>
            <Board selectShip={selectShipInBlock} selectedShip={shipSelected || 0} setShipPosition={setShipPosition} shipPositions={shipPositions}  />
            <ChatBox ws={ws}/>
            </>
            : <>
            <div>
            <h4>Ships</h4>
                <ul>
                    {shipPositions.map((position, index) => (
                        <li key={index}>
                            <Ship select={() => setShipSelected(index)} length={position.shipLength}/>
                        </li>
                    ))}
                </ul>
            </div>
            <Board selectShip={selectShipInBlock} selectedShip={shipSelected || 0} setShipPosition={setShipPosition} shipPositions={shipPositions}  />
            </>
            }
        </div>
      </div>
    )
}
