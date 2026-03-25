import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";
import type { Status } from "../../types/task";

interface props{
  statusFilter:string[];
  priorityFilter:string[];  
}

export default function KanbanView({ statusFilter, priorityFilter }: props) {

  const columns:Status[] = ["Todo", "In Progress", "Review", "Done"];
  
  const tasks = useTaskStore((s) => s.tasks);
  const filteredTasks = tasks.filter((task) => {
  const statusMatch =
    statusFilter.length === 0 || statusFilter.includes(task.status);

  const priorityMatch =
    priorityFilter.length === 0 || priorityFilter.includes(task.priority);

  return statusMatch && priorityMatch;
}); 
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);
  const draggedTaskId = useTaskStore((s) => s.draggedTaskId);
  const setDraggedTaskId = useTaskStore((s) => s.setDraggedTaskId);
   
  const [hoverCol, setHoverCol] = useState<Status | null>(null);
    

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <div 
        key={col} 
        onDragOver={(e) => {
          e.preventDefault();
          setHoverCol(col);
        }}
        onDragLeave={() => setHoverCol(null)}
        onDrop={() => {
          if (draggedTaskId) {
            updateTaskStatus(draggedTaskId, col);
            setDraggedTaskId(null);
            setHoverCol(null);
    }
  }}       
        className={`p-3 rounded-xl h-[500px] flex flex-col 
          ${hoverCol === col ? "bg-blue-100" : "bg-gray-100"}
        `}
      >
        {/* Header */}
          <h2 className="font-bold mb-2">
            {col.toUpperCase()}(   
            {filteredTasks.filter((t) => t.status === col).length})
          </h2>
         {/* Scroll Area */}
<div className="overflow-y-auto flex-1 pr-1">
          {filteredTasks
            .filter((t) => t.status === col)
            .map((task) => {
              const isDragging = draggedTaskId === task.id;

              return isDragging ? (
                <div 
                  key={task.id}
                  className="h-[80px] mb-2 border-2 border-dashed rounded"
                />
              ) : (
                <TaskCard key={task.id} task={task} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
