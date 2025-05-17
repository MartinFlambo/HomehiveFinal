import { create } from "zustand";
import { useAuthStore } from "./authStore"; // Asegúrate de que la ruta sea correcta

interface TaskCreateResult {
  success: boolean;
  error?: string;
}

interface TaskState {
  isLoading: boolean;
  create: (
    title: string,
    description: string,
    dificult: string,
    image: string
  ) => Promise<TaskCreateResult>;
}

export const useTaskStore = create<TaskState>((set) => ({
  isLoading: false,

  create: async (title, description, dificult, image) => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;

      if (!token) {
        throw new Error("Usuario no autenticado");
      }

      const response = await fetch(
        "https://homehivefinal.onrender.com/api/tasks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            dificult,
            image,
          }),
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (!response.ok) throw new Error(data.message || "Algo salió mal");

      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });

      if (error instanceof Error) {
        return { success: false, error: error.message };
      }

      return { success: false, error: "Error desconocido" };
    }
  },
}));
