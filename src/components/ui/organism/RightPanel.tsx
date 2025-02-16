import React from 'react'

interface RightPanelProps {
    children: React.ReactNode
    className?: string
}

export default function RightPanel( { children, className } : RightPanelProps ) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
