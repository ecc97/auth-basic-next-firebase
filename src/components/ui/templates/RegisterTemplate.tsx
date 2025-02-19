"use client"
import React, { useState } from 'react'
import LeftPanel from '../organism/LeftPanel';
import RightPanel from '../organism/RightPanel';
import { SocialLoginGroup } from '../molecules/SocialGroup/SocialLoginGroup';
import { RegisterForm } from '../molecules/Form/RegisterForm';
import styles from '@/assets/sass/register.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { IRegisterRequest, IRegisterResponse } from '@/interfaces/IRegister';

function RegisterTemplate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IRegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result: IRegisterResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error creating user");
      }
      console.log('Registration successful:', result);
      // router.push('/login');

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push('/profile');


    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <LeftPanel className={styles.leftPanel}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link href='/login' className={styles.signInButton}>SIGN IN</Link>
        </LeftPanel>
        <RightPanel className={styles.rightPanel}>
          <h2>Create Account</h2>
          <SocialLoginGroup />
          <p className={styles.divider}>or use your email for registration</p>
          <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
        </RightPanel>
      </div>
    </div>
  )
}

export default RegisterTemplate
