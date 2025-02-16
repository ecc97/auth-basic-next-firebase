import React from 'react'

interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    className: string,
    children: React.ReactNode,
    disabled?: boolean,
    onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement, MouseEvent>>
}

function Button({ type, className, children, disabled }: ButtonProps) {
  return (
    <button type={type} className={className} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button
