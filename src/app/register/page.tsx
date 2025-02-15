"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Facebook, Linkedin, Mail, Lock, User } from "lucide-react";
import styles from "./register.module.scss";
import Link from 'next/link'

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
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
        <div className={styles.leftPanel}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link href='/login' className={styles.signInButton}>SIGN IN</Link>
        </div>
        <div className={styles.rightPanel}>
          <h2>Create Account</h2>
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
          <p className={styles.divider}>or use your email for registration</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={errors.name ? styles.errorInput : ""}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name.message}</span>
              )}
            </div>
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
            <button
              type="submit"
              className={styles.signUpButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}