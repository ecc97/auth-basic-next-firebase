"use client";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return <p>No has iniciado sesión</p>;

  return (
    <div>
      <h1>Bienvenido, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
}
