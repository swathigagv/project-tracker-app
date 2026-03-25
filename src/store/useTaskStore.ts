import { create } from "zustand";
import type { Task, Status } from "../types/task";

type User = {
  id: string;
  name: string;
  color: string;
  taskId: string | null;
};

type TaskState = {
  tasks: Task[];
  users: User[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, status: Status) => void;

  draggedTaskId: string | null;
  setDraggedTaskId: (id: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  users: [
    { id: "u1", name: "A", color: "#f87171", taskId: null },
    { id: "u2", name: "B", color: "#60a5fa", taskId: null },
    { id: "u3", name: "C", color: "#34d399", taskId: null },
  ],
  draggedTaskId: null,

  setTasks: (tasks) => set({ tasks }),
  setDraggedTaskId: (id) => set({ draggedTaskId: id }),
  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));