import React from 'react'
import {Ship} from './Ship'
import './boardStyle.scss'
import { useDrop } from 'react-dnd'
import { ShipPosition } from './types'

interface BoardProps {
  shipPositions: ShipPosition[],
  setShipPosition: (i:number) => void
  selectShip: (i:number) => void,
  selectedShip: number
}

interface SquareProps {
  children:React.ReactNode,
  number: number,
  blocked: boolean,
  setShipPosition: (i:number) => void,
}

export const Board = ({shipPositions, setShipPosition, selectShip, selectedShip}:BoardProps) => {
  const renderSquare = (i: number) => {
    const shipInSquare = shipPositions.find(position => position.block === i)
    const shipHorizontalOverBlock = shipPositions.filter((position, index) => !position.shifted && index !== selectedShip)
    .find(position => ((position.block || 0) - i < shipPositions[selectedShip].shipLength && (position.block || 0) - i > 0) 
    || (i - (position.block || 0) < position.shipLength && i - (position.block || 0) > 0 ))
    const shipHorizontalBlock = i % 10 > shipPositions[selectedShip].shipLength

    console.log(shipPositions[selectedShip].shipLength)

    return <BoardSquare setShipPosition={setShipPosition} number={i} 
    blocked={!!shipInSquare || !!shipHorizontalOverBlock || shipHorizontalBlock}>
      {shipInSquare && <Ship select={() => selectShip(i)} length={shipInSquare?.shipLength}/>}
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
