"use client"
import React, { useState } from 'react'
import LeftPanel from '../organism/LeftPanel';
import RightPanel from '../organism/RightPanel';
import { SocialLoginGroup } from '../molecules/SocialGroup/SocialLoginGroup';
import { RegisterForm } from '../molecules/Form/RegisterForm';
import styles from '@/assets/sass/register.module.scss'
import Link from 'next/link';

function RegisterTemplate() {
    const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Handle registration logic here
      console.log(data);
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
