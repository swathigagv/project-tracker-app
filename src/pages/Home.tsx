import { useEffect, useState } from "react";
import KanbanView from "../components/Kanban/KanbanView";
import ListView from "../components/List/ListView";
import TimelineView from "../components/Time/TimelineView";
import { useSearchParams } from "react-router-dom"; 
import { useTaskStore } from "../store/useTaskStore";
import "../index.css";

export default function Home() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");
  const [searchParams,setSearchParams ] = useSearchParams();
  

 useEffect(() => {
   const interval = setInterval(() => {
     const tasks = useTaskStore.getState().tasks;
     useTaskStore.setState((state) => ({
       users: state.users.map((user) => ({
         ...user,
         taskId: tasks[Math.floor(Math.random() * tasks.length)]?.id,
       })),
     }));
   }, 2000);
 
   return () => clearInterval(interval);
 }, []);

  const statusFilter = searchParams.get("status")?.split(",") || [];
  const priorityFilter = searchParams.get("priority")?.split(",") || [];


const toggleStatus = (status: string) => {
  let updated = [...statusFilter];

  if (updated.includes(status)) {
    updated = updated.filter((s) => s !== status);
  } else {
    updated.push(status);
  }

  const newParams: any = {};

  if (updated.length > 0) {
    newParams.status = updated.join(",");
  }
  if (priorityFilter.length > 0) {
    newParams.priority = priorityFilter.join(",");
  }
  setSearchParams(newParams);
  };


const togglePriority = (priority: string) => {
  let updated = [...priorityFilter];
  
  if (updated.includes(priority)) {
    updated = updated.filter((p) => p !== priority);
  } else {
    updated.push(priority);
  }

  const newParams: any = {};

  if (statusFilter.length > 0) {
    newParams.status = statusFilter.join(",");
  }
  if (updated.length > 0) {
    newParams.priority = updated.join(",");
  }
    setSearchParams(newParams);
  };

  return (
    <div className="p-4">
      {/* View Switch */}
      <div className="header">
        <h2>Multi Project Tracker</h2>
        <button onClick={() => setView("kanban")}>Kanban</button>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("timeline")}>Timeline</button>
      </div>

<div className="fliters">
  {["Low", "Medium", "High", "Critical"].map((p) => (
    <button
      key={p}
      onClick={() => togglePriority(p)}
      className={`px-2 py-1 border rounded 
        ${priorityFilter.includes(p) ? "bg-red-200" : ""}
      `}
    >
      {p}
    </button>
  ))}
</div>
{(statusFilter.length > 0 || priorityFilter.length > 0) && (
  <button
    onClick={() => setSearchParams({})}
    className="px-3 py-1 border  rounded bg-gray-200"
  >
    Clear Filters
  </button>
)}
<div className="fliters">
  {["To Do", "In Progress", "Done"].map((s) => (
    <button
      key={s}
      onClick={() => toggleStatus(s)}
      className={`px-2 py-1 border rounded 
        ${statusFilter.includes(s) ? "bg-blue-200" : ""}
      `}
    >
      {s}
    </button>
  ))}
</div>
  
      {/* Views */}
      {view === "kanban" && <KanbanView statusFilter={statusFilter} priorityFilter={priorityFilter}/>}
      {view === "list" && <ListView statusFilter={statusFilter} priorityFilter={priorityFilter} />}
      {view === "timeline" && <TimelineView statusFilter={statusFilter} priorityFilter={priorityFilter}/>}
    </div>
  );
}
