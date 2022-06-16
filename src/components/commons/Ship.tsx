import React, { useEffect } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import './ship.scss'

interface ShipProps {
  length: number,
  shifted: boolean,
  select?: () => void,
}

export const Ship = ({length, select, shifted}: ShipProps) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type:'ship',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
    }),
    [],
  )
  console.log(shifted)
  useEffect(() => {
    if (isDragging && select) {
      select()
    }
  }, [isDragging])
  return (
    <div ref={drag} className={'ship'} style={shifted? {height: (48 * length), width: 38}: {height: 38, width: (48 * length)}}/>
  )
}
