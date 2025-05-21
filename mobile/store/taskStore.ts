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
  getUserTasks: (completed?: boolean) => Promise<TaskGetResult>;
  deleteTask: (taskId: string) => Promise<{ success: boolean; error?: string }>;
  completeTask: (
    taskId: string
  ) => Promise<{ success: boolean; error?: string }>;
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

      await useTaskStore.getState().getUserTasks(false);

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
  deleteTask: async (id) => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Usuario no autenticado");

      const response = await fetch(
        `https://homehivefinal.onrender.com/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear la tarea");
      }

      await useTaskStore.getState().getUserTasks(false);

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

  completeTask: async (id) => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Usuario no autenticado");

      const response = await fetch(
        `https://homehivefinal.onrender.com/api/tasks/${id}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al completar la tarea");
      }

      await useTaskStore.getState().getUserTasks(false);

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

  getUserTasks: async (completed?: boolean) => {
    set({ isLoading: true });

    try {
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("Usuario no encontrado");

      const url =
        completed !== undefined
          ? `https://homehivefinal.onrender.com/api/tasks/user?completed=${completed}`
          : "https://homehivefinal.onrender.com/api/tasks/user";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

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
