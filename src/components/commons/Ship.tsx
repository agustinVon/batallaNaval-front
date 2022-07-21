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
  useEffect(() => {
    if (isDragging && select) {
      select()
    }
  }, [isDragging])
  const height = shifted ? ( isSmall? 37 * length : 47 * length) : isSmall ? 27 : 37
  const width = !shifted ? ( isSmall? 37 * length : 47 * length) : isSmall ? 27 : 37
  return (
    <div ref={drag} className={'ship'} style={{height: height, width: width}}/>
  )
}
