import React from 'react'

interface LeftPanelProps {
    children: React.ReactNode
    className?: string
}

export default function LeftPanel( { children, className } : LeftPanelProps ) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}