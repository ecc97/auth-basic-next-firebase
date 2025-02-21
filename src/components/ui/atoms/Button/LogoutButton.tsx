"use client";
import { signOut } from "next-auth/react";
import Button from "./Button";

interface LoginButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LoginButtonProps) {
  return <Button type="button" className={className} onClick={() => signOut()}>Logout</Button>;
}
