import React from 'react'
import './boardStyle.scss'

interface BoardProps {
  shipPositions: ShipPosition[]
}

interface ShipPosition {
  block: number,
  shifted: boolean,
  shipLength: number 
}

export const Board = ({shipPositions}:BoardProps) => {
  return (
    <div className='positionBoard'>
    </div>
  )
}

const BoardSquare = () => {
    return <div className='square'>
    </div>
}
