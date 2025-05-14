import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { create } from 'zustand';


interface RegisterResult {
    success: boolean;
    error?: string;
}

interface AuthState {
    user: string | null;
    token: string | null;
    isLoading: boolean;
    register: (username: string, email: string, password: string) => Promise<RegisterResult>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username: string, email: string, password: string) =>{
        set({isLoading: true});
        try{
            const response = await fetch("https://homehivefinal.onrender.com/api/auth/register", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || "Algo salió mal")

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({token: data.token, user: data.user, isLoading: false});

            return{success: true,}
        }catch(error){
            set({isLoading: false});
            if (error instanceof Error){
                return{success: false, error: error.message}
            }
            return{success:false, error: "Error desconocido"}
        }
    }
}));
