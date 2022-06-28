import React from 'react'
import "./gameStyle.scss"

export const WaitingForOponent = ({message}:{message: string}) => {
  return (
    <div className='verticalBackground'>
        <h4>{`Waiting for oponent ${message}...`}</h4>
    </div>
  )
}
