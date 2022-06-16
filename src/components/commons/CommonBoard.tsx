import React from 'react'
import { ShipPosition, Shot } from './types'
import {Ship} from './Ship'
import './boardStyle.scss'

interface Props {
    shots?: Shot[],
    positions?: ShipPosition[]
}

export const CommonBoard = ({shots, positions}:Props) => {
    const renderSquare = (i: number) => {
        const shipInSquare = positions?.find(position => position?.blocksOccupied?.at(0) === i)
        const blockShooted = shots?.find(shot => shot.block === i)
    
        return <div className='square'>
            {shipInSquare ? <Ship shifted={shipInSquare.shifted} length={shipInSquare?.shipLength}/>
            : blockShooted && <div className='shot' style={blockShooted.hit ? {borderColor: "#B72A2A"} : {borderColor: "#555555"}}/>}
        </div>
      }
    
      const squares = []
      for(let i =0; i < 100; i += 1){
        squares.push(renderSquare(i))
      }
    
      return (
        <div className='smallPositionBoard'>
          {squares}
        </div>
      )
}
