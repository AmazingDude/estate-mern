import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await axios.post("/api/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            });
            const data = res.data;
            console.log(data);
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <button
            className="bg-black text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:opacity-85 transition"
            type="button"
            onClick={handleGoogleAuth}
        >
            <FcGoogle className="text-lg" />
            Continue with Google
        </button>
    );
}
