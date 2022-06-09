import React, { useEffect } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import './ship.scss'

interface ShipProps {
  length: number,
  select?: () => void
}

export const Ship = ({length, select}: ShipProps) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type:'ship',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )
    useEffect(() => {
      if (isDragging && select) {
        select()
      }
    }, [isDragging])
  return (
    <div ref={drag} className={'ship'} style={{height: 38, width: (48 * length)}}>Ship</div>
  )
}
