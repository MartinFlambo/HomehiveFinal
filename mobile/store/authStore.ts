import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface User {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: string;
}

interface RegisterResult {
  success: boolean;
  error?: string;
}
interface LoginResults {
  success: boolean;
  error?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<LoginResults>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://homehivefinal.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Algo salió mal");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Error desconocido" };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user: User | null = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://homehivefinal.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Algo salió mal");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Error desconocido" };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
    } catch (error) {
      console.log("Logout failed", error);
    }
  },
}));
