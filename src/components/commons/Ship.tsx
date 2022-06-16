import React, { useEffect } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import './ship.scss'

interface ShipProps {
  length: number,
  shifted: boolean,
  select?: () => void,
  isSmall?: boolean
}

export const Ship = ({length, select, shifted, isSmall = false}: ShipProps) => {
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
  const height = shifted ? ( isSmall? 38 * length : 48 * length) : isSmall ? 28 : 38
  const width = !shifted ? ( isSmall? 38 * length : 48 * length) : isSmall ? 28 : 38
  return (
    <div ref={drag} className={'ship'} style={{height: height, width: width}}/>
  )
}
