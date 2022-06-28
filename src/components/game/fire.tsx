import React, {useState} from 'react'
import { CommonButton } from '../commons/Button'
import { CommonBoard } from '../commons/CommonBoard'
import { ShipPosition, Shot } from '../commons/types'
import { useSubscription } from 'react-stomp-hooks';
import './gameStyle.scss'

interface Props {
    positions: ShipPosition[],
    myShots: Shot[],
    enemyShots: Shot[],
    waiting: boolean
    gameId: string
}

export const EXPLOSION_STATUS = {
  hit: 'HIT',
  miss: 'MISS',
  waiting: 'WAITING'
}

export const Fire = ({positions, myShots, enemyShots, waiting, gameId}:Props) => {

  const [selectedSqare, setSelectedSquare] = useState<number>()
  // const [explosion, setExplosion] = useState<string>('WAITING')

  // useSubscription(`/game/${gameId}/shoot-response`, response => {
  //   const fireResponse = JSON.parse(response.body)
  //   console.log('FIRE RESPONSE')
  // })

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
