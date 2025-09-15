import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <motion.div
      className="h-auto min-h-[12rem] lg:h-[16rem] px-3 lg:px-4 py-3 flex flex-col gap-3 lg:gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div className="flex-1">
        <h4 className="font-bold text-lg lg:text-2xl line-clamp-2">{task.title}</h4>
        <p className="text-sm lg:text-base text-gray-600 line-clamp-3 mt-1">{task.description}</p>
      </div>
      <div className="mt-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <p className="text-xs lg:text-sm text-gray-400">{formatTime(task.createdAt)}</p>
          <p className={`text-xs lg:text-sm font-bold ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </p>
        </div>
        <div className="w-full lg:w-auto">
          <div className="flex items-center justify-center lg:justify-end gap-3 text-gray-400 text-lg lg:text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              {star}
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;