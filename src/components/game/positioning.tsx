import React, {useState, useEffect} from 'react'
import { Ship } from '../commons/Ship'
import { Board } from '../commons/PositioningBoard'
import { ShipPosition } from '../commons/types'
import "./gameStyle.scss"
import { CommonButton } from '../commons/Button'

interface Props {
    positions: ShipPosition[]
    setPositions: React.Dispatch<React.SetStateAction<ShipPosition[]>>
    sendPositions: () => void
}

export const Positioning = ({positions, setPositions, sendPositions}:Props) => {

    const [shipSelected, setShipSelected] = useState<ShipPosition>(positions[0])

    const setShipPosition = (block:number) => {
        setPositions(positions.map((position, index) => {
            if (index === positions.indexOf(shipSelected)) {
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

    useEffect(() => {
        window.addEventListener("keydown", setShipShift);
        window.addEventListener("keyup", setShipShift);
        // Remove event listeners on cleanup
        return () => {
        window.removeEventListener("keydown", setShipShift);
        window.removeEventListener("keyup", setShipShift);
        };
    }, [])

    const setShipShift = ({key}:{key:String}) => {
        if (key === 'Shift') {
            setPositions(prevPositions => prevPositions.map((position) => {
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

    const selectShipInBlock = (block:number) => {
        setShipSelected(positions.find(position => position?.blocksOccupied?.at(0) === block) || positions[0])
    }

    return (
        <div className='verticalBackground'>
            <div className='horizontalWrapper'>
                <div className='positionsListWrapper'>
                    <h4>Ships</h4>
                    <ul>
                        {positions.map((position, index) => (
                            !position.blocksOccupied && <li key={index}>
                                <Ship shifted={position.shifted} select={() => setShipSelected(position)} length={position.shipLength}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <Board selectShip={selectShipInBlock} selectedShip={shipSelected} setShipPosition={setShipPosition} shipPositions={positions}  />
            </div>
            <CommonButton text={'Set positions'} onClick={sendPositions}/>
        </div>
    )
}
