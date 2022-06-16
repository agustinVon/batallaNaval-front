import React, { FormEvent, useEffect, useState } from 'react'
import { Board } from '../commons/Board';
import { ChatBox } from '../commons/ChatBox';
import { Navbar } from '../commons/Navbar';
import { ShipPosition } from '../commons/types';
import './gameStyle.scss'
import { Ship } from '../commons/Ship';


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
    const [shipSelected, setShipSelected] = useState<ShipPosition>(shipPositions[0])
    const [ws, setWebsocket] = useState<WebSocket>()

    const setShipPosition = (block:number) => {
        setShipPositions(shipPositions.map((position, index) => {
            if (index === shipPositions.indexOf(shipSelected)) {
                let blocksOccupied = []
                for(let i = 0; i < shipSelected.shipLength; i++){
                    if(shipSelected.shifted) {
                        blocksOccupied.push(block + 10 * i)
                    } else {
                        blocksOccupied.push(block + i)
                    }
                }
                return {
                    ...position,
                    block: block,
                    blocksOccupied: blocksOccupied
                }
            }
            else {
                return position
            }
        }))
    }

    const setShipShift = ({key}:{key:String}) => {
        if (key === 'Shift') {
            setShipPositions(prevPositions => prevPositions.map((position) => {
            if (position.blocksOccupied === undefined) {
                return {
                    ...position,
                    shifted: !position.shifted
                }
            }
            else {
                return position
            }}))  
        }
    }

    useEffect(() => {
        console.log(shipPositions)
    }, [shipPositions])


    useEffect(() => {
        if(!ws) {
            console.log('connect')
            const URL = "ws://localhost:8080/game/join-game"
            setWebsocket(() => {
            const ws = new WebSocket(URL);
            ws.onmessage = (m) => {console.log(m)};
            ws.onclose = (c) => {console.log(c)};
            return ws;
            })
        }
    }, [ws])

    const selectShipInBlock = (block:number) => {
        setShipSelected(shipPositions.find(position => position?.blocksOccupied?.at(0) === block) || shipPositions[0])
    }

    useEffect(() => {
        window.addEventListener("keydown", setShipShift);
        window.addEventListener("keyup", setShipShift);
        // Remove event listeners on cleanup
        return () => {
        window.removeEventListener("keydown", setShipShift);
        window.removeEventListener("keyup", setShipShift);
        };
    }, [])


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
                        !position.blocksOccupied && <li key={index}>
                            <Ship shifted={position.shifted} select={() => setShipSelected(position)} length={position.shipLength}/>
                        </li>
                    ))}
                </ul>
            </div>
            <Board selectShip={selectShipInBlock} selectedShip={shipSelected} setShipPosition={setShipPosition} shipPositions={shipPositions}  />
            <ChatBox ws={ws} userId={`${userId}`}/>
            </>
            : <>
            <div>
                <h4>Ships</h4>
                <ul>
                    {shipPositions.map((position, index) => (
                        <li key={index}>
                            <Ship shifted={position?.shifted} select={() => setShipSelected(position)} length={position.shipLength}/>
                        </li>
                    ))}
                </ul>
            </div>
            <Board selectShip={selectShipInBlock} selectedShip={shipSelected} setShipPosition={setShipPosition} shipPositions={shipPositions}  />
            </>
            }
        </div>
      </div>
    )
}
