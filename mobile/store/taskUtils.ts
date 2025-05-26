import { Task } from "../interfaces/interfaces";

export type DailyPoints = Record<string, number>;


export function getDailyPoints(tasks: Task[]): DailyPoints {
  return tasks
    .filter((t) => t.completed)
    .filter(
      (t) =>
        new Date(t.updatedAt).getTime() !==
        new Date(t.createdAt).getTime()
    )
    .reduce<DailyPoints>((acc, t) => {
      const day = new Date(t.updatedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      acc[day] = (acc[day] || 0) + t.score;
      return acc;
    }, {});
}
