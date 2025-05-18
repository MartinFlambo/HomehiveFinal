import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { Task, TaskGetResult } from "../interfaces/interfaces";

interface TaskCreateResult {
  success: boolean;
  error?: string;
}

interface TaskState {
  isLoading: boolean;
  tasks: Task[] | null;
  create: (
    title: string,
    description: string,
    dificult: string,
    image: string
  ) => Promise<TaskCreateResult>;
  getUserTasks: () => Promise<TaskGetResult>;
}

export const useTaskStore = create<TaskState>((set) => ({
  isLoading: false,
  tasks: [],

  create: async (title, description, dificult, image) => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Usuario no autenticado");

      const response = await fetch(
        "https://homehivefinal.onrender.com/api/tasks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({ title, description, dificult, image }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Error al crear la tarea");

      await useTaskStore.getState().getUserTasks();

      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  },

  getUserTasks: async () => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Usuario no encontrado");

      const response = await fetch(
        "https://homehivefinal.onrender.com/api/tasks/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data: Task[] = await response.json();
      if (!response.ok) throw new Error("Algo salió mal obteniendo las tareas");

      set({ isLoading: false, tasks: data });
      return { success: true, tasks: data };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  },
}));
