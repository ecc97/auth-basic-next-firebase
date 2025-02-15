"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Facebook, Linkedin, Mail, Lock } from "lucide-react";
import styles from "./login.module.scss";
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Handle login logic here
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.leftPanel}>
          <h2>Sign in</h2>
          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <Facebook size={20} />
            </button>
            <button className={styles.socialButton}>
              <Mail size={20} />
            </button>
            <button className={styles.socialButton}>
              <Linkedin size={20} />
            </button>
          </div>
          <p className={styles.divider}>or use your account</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email.message}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={errors.password ? styles.errorInput : ""}
              />
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <a href="#" className={styles.forgotPassword}>
              Forgot your password?
            </a>
            <button
              type="submit"
              className={styles.signInButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>
        <div className={styles.rightPanel}>
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <Link href='/register' className={styles.signUpButton}>SIGN UP</Link>
        </div>
      </div>
    </div>
  );
}