import { useState } from 'react';
import './buttonStyle.scss';

interface ButtonProps {
  text: string;
  width: number;
  onClick: () => void
}

interface DropdownButtonProps {
  text: string;
  width: number;
  children: React.ReactNode
}

export const CommonButton = ({ text, width, onClick }: ButtonProps) => {
  return (
    <button style={{width: width}} onClick = {onClick}>
      <label>{text}</label>
    </button>
  )
}

export const DropdownButton = ({ children, text, width }: DropdownButtonProps) => {
  const [expanded, setExpand] = useState(false)

  return (
    <button style={{width: width}} onClick={!expanded ? () => setExpand(true) : () => {}}>
      {!expanded 
      ? <label>{text}</label>
      : <div>
        {children}
      </div>
      }

    </button>
  )
}

