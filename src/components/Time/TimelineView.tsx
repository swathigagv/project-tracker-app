import { useTaskStore } from "../../store/useTaskStore";
import "../../index.css";

interface Props {
  statusFilter: string[];
  priorityFilter: string[];
}

export default function TimelineView({ statusFilter, priorityFilter }: Props) {
  const tasks = useTaskStore((s) => s.tasks);
  // filtering part
  const filteredTasks = tasks.filter((task) => {
  const statusMatch =
    statusFilter.length === 0 || statusFilter.includes(task.status);

  const priorityMatch =
    priorityFilter.length === 0 || priorityFilter.includes(task.priority);

  return statusMatch && priorityMatch;
}); 
 // color coding
const dayWidth = 30; // px per day

const getDay = (date: string) => new Date(date).getDate();

const getLeft = (start?: string, due?: string) => {
  const day = start ? getDay(start) : getDay(due!);
  return (day - 1) * dayWidth;
};

const getWidth = (start?: string, due?: string) => {
  if (!start || !due) return dayWidth;
  return (getDay(due) - getDay(start) + 1) * dayWidth;
};

const getColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "#ef4444";
    case "High":
      return "#f97316";
    case "Medium":
      return "#3b82f6";
      case "Low":
        return "#10b981";
    default:
      return "#9ca3af";
  }
};

 const today = new Date().getDate();
 const todayLeft = (today - 1) * dayWidth;

 // Add a vertical line for today
  return (
    <div className="timeline-container">
      <div className="relative min-w-[1000px] bg-white">
         {/* Today line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500"
          style={{ left: todayLeft }}
        />
        {filteredTasks.map((task) => {
          const left = getLeft(task.startDate, task.dueDate);
          const width = getWidth(task.startDate, task.dueDate);
         
          return (
            <div
              key={task.id}
              className="flex items-center h-14 mb-2 bg-slate-400">
                {/* left label */}
             <div 
            className="w-40 text-sm font-medium" 
            >
              {task.title}
            </div>
            {/* timelinebar area */}
            <div className="relative flex-1 h-full border-l border-gray-200">
              <div
                className="absolute top-2 h-8 w-10 rounded text-white text-xs flex items-center px-2"
                style={{ 
                  left,
                  width, 
                  backgroundColor: getColor(task.priority),
                 }}
                 >
                  {task.title}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}