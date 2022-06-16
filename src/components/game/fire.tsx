import React, {useState} from 'react'
import { CommonButton } from '../commons/Button'
import { CommonBoard } from '../commons/CommonBoard'
import { ShipPosition, Shot } from '../commons/types'
import './gameStyle.scss'

interface Props {
    positions: ShipPosition[],
    myShots: Shot[],
    enemyShots: Shot[],
    waiting: boolean
}

export const Fire = ({positions, myShots, enemyShots, waiting}:Props) => {

  const [selectedSqare, setSelectedSquare] = useState<number>()

  return (
    <div className='verticalBackground'>
        <div className='horizontalWrapper'>
            <CommonBoard shots={enemyShots} positions={positions}/>
            {!waiting ? <CommonBoard shots={myShots} onSelect={setSelectedSquare} selectedSquare={selectedSqare} />
            : <CommonBoard shots={myShots} /> }
        </div>
        <CommonButton text='FIRE' className='mediumButton'/>
    </div>
  )
}
