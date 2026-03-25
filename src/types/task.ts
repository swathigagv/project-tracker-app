export type Status = "Todo" | "In Progress" | "Review" | "Done";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  startDate?: string;
  dueDate: string;
}