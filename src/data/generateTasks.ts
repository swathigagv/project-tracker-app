import  type { Task } from "../types/task";

const statuses = ["Todo", "In Progress", "Review", "Done"] as const;
const priorities = ["Low", "Medium", "High", "Critical"] as const;
const users = ["AB", "CD", "EF", "GH", "IJ", "KL"];

export const generateTasks = (count: number): Task[] => {
  return Array.from({ length: count }, (_, i) => {
    const randomDate = () =>
      new Date(
        2026,
        2,
        Math.floor(Math.random() * 30) + 1
      ).toISOString();

    return {
      id: String(i),
      title: `Task ${i + 1}`,
      status: statuses[Math.floor(Math.random() * 4)],
      priority: priorities[Math.floor(Math.random() * 4)],
      assignee: users[Math.floor(Math.random() * users.length)],
      startDate: Math.random() > 0.3 ? randomDate() : undefined,
      dueDate: randomDate(),
    };
  });
};