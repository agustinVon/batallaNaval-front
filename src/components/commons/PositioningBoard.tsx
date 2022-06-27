import React from 'react'
import {Ship} from './Ship'
import './boardStyle.scss'
import { useDrop } from 'react-dnd'
import { ShipPosition } from './types'

interface BoardProps {
  shipPositions: ShipPosition[],
  setShipPosition: (i:number) => void
  selectShip: (i:number) => void,
  selectedShip: ShipPosition
}

interface SquareProps {
  children:React.ReactNode,
  number: number,
  blocked: boolean,
  setShipPosition: (i:number) => void,
}

export const Board = ({shipPositions, setShipPosition, selectShip, selectedShip}:BoardProps) => {
  const renderSquare = (i: number) => {
    const shipInSquare = shipPositions.find(position => position?.blocksOccupied?.at(0)?.x === i % 10 && position?.blocksOccupied?.at(0)?.y === i / 10)
    const blockedByShip = shipPositions.find(position => position?.blocksOccupied?.find(block => {
      if(selectedShip.shifted) {
        if (block.y === i % 10) {
          return block.y - i/10 < selectedShip.shipLength && block.y - i/10 >= 0
        }
      } else {
        return block.x - i < selectedShip.shipLength && block.x - i >= 0
      }
    }))
    const horizontalLimits = !selectedShip.shifted && i % 10 > 10 - selectedShip.shipLength
    const verticalLimits = selectedShip.shifted && i/10 > 11 - selectedShip.shipLength

    return <BoardSquare setShipPosition={setShipPosition} number={i} 
    blocked={!!shipInSquare || !!blockedByShip || horizontalLimits || verticalLimits}>
      {shipInSquare && <Ship shifted={shipInSquare.shifted} select={() => selectShip(i)} length={shipInSquare?.shipLength}/>}
      </BoardSquare>
  }

  const squares = []
  for(let i =0; i < 100; i += 1){
    squares.push(renderSquare(i))
  }

  return (
    <div className='positionBoard'>
      {squares}
    </div>
  )
}

const BoardSquare = ({children, number, blocked, setShipPosition}:SquareProps) => {
  const [{isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'ship',
      canDrop: () => !blocked,
      drop: () =>  setShipPosition(number),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    }),
    [setShipPosition]
  )

  return <div ref={drop} style={isOver && !canDrop && {backgroundColor: '#B72A2A'} || {}} role="Space" className='square'>
    {children}
  </div>
}
