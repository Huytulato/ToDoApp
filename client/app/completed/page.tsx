"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";

import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import TaskItem from "@/app/Components/TaskItem/TaskItem";
import Filters from "@/app/Components/Filters/Filters";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { openModalForAdd, priority, completedTasks, setPriority } = useTasks();

  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-3 lg:m-6 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl lg:text-2xl font-bold">Completed Tasks</h1>
        <motion.button
          className="px-4 py-2 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600 transition duration-200 text-sm lg:text-base"
          onClick={openModalForAdd}
        >
          <span className="hidden sm:inline">Add a new Task</span>
          <span className="sm:hidden">Add Task</span>
        </motion.button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 lg:gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[12rem] lg:h-[16rem] w-full py-2 rounded-md text-base lg:text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}