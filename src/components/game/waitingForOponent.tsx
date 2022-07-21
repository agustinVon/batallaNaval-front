import React, { ReactNode } from 'react'
import "./gameStyle.scss"

export const WaitingForOponent = ({message, children}:{message: string, children?:ReactNode}) => {
  return (
    <div className='verticalBackground'>
        <h4>{`Waiting for oponent ${message}...`}</h4>
        {children}
    </div>
  )
}
