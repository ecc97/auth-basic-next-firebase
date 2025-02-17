import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";


export async function POST(request: Request) {
    const { name, email, password } = await request.json();

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

        const token = await user.getIdToken();
        console.log("Token recibido:", token);


        return NextResponse.json({ message: "User created successfully", user: userDoc }, { status: 200 });
    } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
            return NextResponse.json({ error: "El correo ya está registrado. Intenta iniciar sesión." }, { status: 400 });
        }
        if (error.code === "auth/weak-password") {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}   