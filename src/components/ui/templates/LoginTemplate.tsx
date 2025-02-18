"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import LeftPanel from '../organism/LeftPanel';
import RightPanel from '../organism/RightPanel';
import { SocialLoginGroup } from '../molecules/SocialGroup/SocialLoginGroup';
import { LoginForm } from '../molecules/Form/LoginForm';
import styles from '@/assets/sass/login.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LoginTemplate() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            })

            if (result?.error) {
                console.error('Login failed:', result.error);
                throw new Error(result.error)
            } 
            console.log('Login successful:', result);
            router.push('/profile')

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <LeftPanel className={styles.leftPanel}>
                    <h2>Sign in</h2>
                    <SocialLoginGroup />
                    <p className={styles.divider}>or use your account</p>
                    <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
                </LeftPanel>
                <RightPanel className={styles.rightPanel}>
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <Link href='/register' className={styles.signUpButton}>SIGN UP</Link>
                </RightPanel>
            </div>
        </div>
    )
}

export default LoginTemplate
