import { useState } from 'react';
import './buttonStyle.scss';

interface ButtonProps {
  text: string;
  width?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

interface DropdownButtonProps {
  text: string;
  width: number;
  children: React.ReactNode;
}

export const CommonButton = ({ text, width = 120, onClick, className, disabled }: ButtonProps) => {
  return (
    <button className={className} style={{width: width}} onClick = {onClick} disabled={disabled}>
      <label>{text}</label>
    </button>
  )
}

export const SubmitButton = ({ text, width = 120, className }: ButtonProps) => {
  return (
    <button className={className} type='submit' style={{width: width}}>
      <label>{text}</label>
    </button>
  )
}

export const DropdownButton = ({ children, text, width = 120 }: DropdownButtonProps) => {
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

