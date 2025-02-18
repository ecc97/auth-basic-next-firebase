'use client'
import React from 'react'

interface ILayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: ILayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout