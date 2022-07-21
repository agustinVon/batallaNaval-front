import React from 'react'
import { CommonButton } from '../commons/Button'
import "./gameStyle.scss"

export const WinLoseScreen = ({ goHome, hasWon }:{goHome: () => void, hasWon: boolean}) => {
  return (
    <div className='verticalBackground'>
        {hasWon ? <h4>{'You Win'}</h4>: <h4>{'You Lose'}</h4>}
        <CommonButton text='Go Home' onClick={goHome}/>
    </div>
  )
}
