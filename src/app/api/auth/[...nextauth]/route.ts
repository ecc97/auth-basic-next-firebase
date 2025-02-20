import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc,getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { ILoginRequest, ILoginResponse } from "@/interfaces/ILogin";

interface AuthToken {
  id?: string;
  token?: string;
}

interface AuthUser {
  id: string; 
  name: string;
  email: string;
  token: string;
}

interface CustomSession extends Session {
  user: {
    id?: string;
    token?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo Electrónico", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        try {
          const { email, password } = credentials as ILoginRequest;
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const user = userCredential.user;
          const token = await user.getIdToken();

          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            throw new Error("User not found in database");
          }
          const userData = userDoc.data();

          const response: ILoginResponse = {
            user: {
              email: user.email!,
              name: userData.name,
            }
          }

          return {
            id: user.uid,
            name: response.user?.name,
            email: response.user?.email,
            token,
          };
          
        } catch (error: unknown) {
          if (error instanceof FirebaseError) {
            if (error.code === "auth/invalid-credential") {
              throw new Error('Error invalid credentials');
            }
            if (error.code === "auth/wrong-password") {
              throw new Error('Error wrong password');
            }
            if (error.code === "auth/user-not-found") {
              throw new Error('Error user not found');
            }
            throw new Error('Error authenticating' + error.message);
          }
          throw new Error('Error unknown authenticating or invalid credentials');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.token = authUser.token;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      customSession.user.id = (token as AuthToken).id;
      customSession.user.token = (token as AuthToken).token;
      return customSession;
    },
  },
};

export const authHandler = NextAuth(authOptions);

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);