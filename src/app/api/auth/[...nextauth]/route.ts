import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc,getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

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
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;
          const token = await user.getIdToken();

          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            throw new Error("User not found in database");
          }
          const userData = userDoc.data();

          return {
            id: user.uid,
            name: userData.name,
            email: user.email,
            token,
          };
          
        } catch (error) {
          if (error instanceof FirebaseError) {
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
  secret: '4f2dd9cb2932e93c2544eba04e57d267b64e7ed43c8c06ba4e9665ef00ba621f',
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