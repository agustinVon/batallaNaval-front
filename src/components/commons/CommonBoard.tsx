import React from 'react'
import { ShipPosition, Shot } from './types'
import {Ship} from './Ship'
import './boardStyle.scss'

interface Props {
    shots?: Shot[],
    positions?: ShipPosition[],
    selectedSquare?: number,
    onSelect?: (n:number) => void
}

export const CommonBoard = ({shots, positions, selectedSquare, onSelect}:Props) => {
    const renderSquare = (i: number) => {
        const shipInSquare = positions?.find(position => position?.blocksOccupied?.at(0) === i)
        const blockShooted = shots?.find(shot => shot.block === i)

        const onSelectBlock = () => {
            if (!shipInSquare && !blockShooted && onSelect) {
                onSelect && onSelect(i)
            }
        }
    
        return <div className={onSelect ? 'toggeableSquare' : 'square'} onClick={onSelectBlock}>
            {shipInSquare && <Ship isSmall={true} shifted={shipInSquare.shifted} length={shipInSquare?.shipLength}/>}
            {blockShooted ? <div className='shot' style={blockShooted.hit ? {borderColor: "#B72A2A"} : {borderColor: "#555555"}}/>
            : selectedSquare === i && <div className='shot' style={{borderColor: "#3cbe3a"}}/>}
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
