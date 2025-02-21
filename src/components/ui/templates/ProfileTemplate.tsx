"use client"
import React from 'react'
import { CircleUser } from 'lucide-react'
import LogoutButton from '../atoms/Button/LogoutButton'
import { Session } from 'next-auth'
import styles from '@/assets/sass/profile.module.scss'


interface IProfileTemplateProps {
    session: Session,
    children?: React.ReactNode,
    className?: string,
    title?: string,
    subtitle?: string,
}

function ProfileTemplate({ session }: IProfileTemplateProps) {
    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.avatar}>
                    <div className={styles.profileImage}>
                        <CircleUser size={80} color="#7a4c54" />
                    </div>
                </div>
                <div className={styles.info}>
                    <h1>Welcome {session.user?.name || "User"}</h1>
                    <p>Email: {session.user?.email}</p>
                    <LogoutButton className={styles.logoutButton} />
                </div>
            </div>
        </div>
    )
}

export default ProfileTemplate
