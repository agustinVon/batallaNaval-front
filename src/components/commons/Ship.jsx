
import React, { useEffect, useState } from 'react';

export default function Ship(props) {
  const {
    onPointerDown = () => {},
    onPointerUp = () => {},
    onPointerMove = () => {},
    position,
    setPosition
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);

    onPointerDown(e);
  };
  
  const handlePointerUp = (e) => {
    setIsDragging(false);
    
    onPointerUp(e);
  };
  
  const handlePointerMove = (e) => {
    if (isDragging) onDragMove(e);
    
    onPointerMove(e);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    }
  }, []);

  return (
    <div
      style={{
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      Ship
    </div>
  );
}
