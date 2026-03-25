import { useEffect } from "react";
import { useTaskStore } from "./store/useTaskStore";
import { generateTasks } from "./data/generateTasks";
import Home from "./pages/Home";

export default function App() {
  const setTasks = useTaskStore((s) => s.setTasks);

  useEffect(() => {
    const tasks = generateTasks(500);
    setTasks(tasks);
  }, []);

  return (
  <Home />
);
}