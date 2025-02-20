import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { IRegisterRequest, IRegisterResponse, IErrorResponse } from "@/interfaces/IRegister";
import { FirebaseError } from "firebase/app";


export async function POST(request: Request) {
    const body: IRegisterRequest = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        
        const userDoc = {
            uid: user.uid,
            name,
            email,
            createdAt: new Date().toISOString(),
        };
        
        await setDoc(doc(db, "users", user.uid), userDoc);

        // const token = await user.getIdToken();
        // console.log("Token recibido:", token);

        return NextResponse.json<IRegisterResponse>({ message: "User created successfully", user: userDoc }, { status: 200 });
    } catch (error: unknown) {
        let errorMsg: IErrorResponse["error"] = "Error en el servidor. Intenta nuevamente."
        if (error instanceof FirebaseError) {
            if (error.code === "auth/email-already-in-use") {
                return NextResponse.json({ error: "El correo ya está registrado. Intenta iniciar sesión." }, { status: 400 });
            }
            if (error.code === "auth/weak-password") {
                return NextResponse.json({ error: "La contraseña es demasiado débil. Usa al menos 6 caracteres." }, { status: 400 });
            }
        } else if (error instanceof Error) {
            errorMsg = error.message;
        } else {
            console.error("Error en la autenticación:", error);
        }
      
        return NextResponse.json<IErrorResponse>({ error: errorMsg }, { status: 500 });
    }
}   