import { useTaskStore } from "../../store/useTaskStore";
import { useVirtualScroll } from "../../hooks/useVirtualScroll";

interface props{
  statusFilter:string[];
  priorityFilter:string[];  
}

export default function ListView({ statusFilter, priorityFilter }: props) {
  const tasks = useTaskStore((s) => s.tasks);
  const filteredTasks = tasks.filter((task) => {
  const statusMatch =
    statusFilter.length === 0 || statusFilter.includes(task.status);

  const priorityMatch =
    priorityFilter.length === 0 || priorityFilter.includes(task.priority);

  return statusMatch && priorityMatch;
}); 

  const rowHeight = 50;

  const {
    totalHeight,
    startIndex,
    endIndex,
    setScrollTop,
  } = useVirtualScroll(filteredTasks.length, rowHeight);

  const visibleTasks = filteredTasks.slice(startIndex, endIndex);
  
  return (
    <div className="h-[500px] overflow-auto border"
    onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{height: totalHeight, position: "relative"}}>
        {visibleTasks.map((task, i) => {
          const index = startIndex + i;
         
          return (
          <div 
            key={task.id} 
            className="border-b flex items-center px-2"
            style={{
              position: "absolute",
              top: index * rowHeight,
              height: rowHeight,
              left:0,
              right:0,
            }}
          >
            {task.title} - {task.status}
          </div>
          );
})}
      </div>
      </div>
  );
}
