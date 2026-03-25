import type { Task } from "../../types/task";
import { useTaskStore } from "../../store/useTaskStore";

const priorityColors = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-orange-200 text-orange-800",
  Critical: "bg-red-200 text-red-800",
};

function formatDueDate(date: string) {
  const today = new Date();
  const due = new Date(date);

  const diff = Math.floor(
    (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Due Today";
  if (diff > 7) return `${diff} days overdue`;

  return due.toLocaleDateString();
}

export default function TaskCard({ task }: { task: Task }) {
  const draggedTaskId = useTaskStore((s) => s.draggedTaskId);
  const isDragging = draggedTaskId === task.id;
  const setDraggedTaskId = useTaskStore((s) => s.setDraggedTaskId);
  return (
    <>
    <div
      draggable
      onDragStart={() => setDraggedTaskId(task.id)}
      onDragEnd={() => setDraggedTaskId(null)}
      className={`bg-white p-3 mb-2 rounded-xl shadow-sm border cursor-grab 
        ${isDragging ? "opacity-50 shadow-lg" : " "}
        `}
    >
      {task.title}
    </div>
    <div className="bg-white p-3 mb-2 rounded-xl shadow-sm border">
      
      {/* Title */}
      <h3 className="font-medium text-sm mb-2">{task.title}</h3>

      {/* Bottom Row */}
      <div className="flex items-center justify-between text-xs">
        
        {/* Avatar */}
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white">
          {task.assignee}
        </div>

        {/* Priority */}
        <span className={`px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Due Date */}
      <div className="mt-2 text-xs text-gray-600">
        {formatDueDate(task.dueDate)}
      </div>
    </div>
    </>
  );
}