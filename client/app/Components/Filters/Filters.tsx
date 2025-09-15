import { useTasks } from "@/context/taskContext";
import React from "react";

function Filters() {
  const { priority, setPriority } = useTasks();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className="flex gap-2 min-w-max">
      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            activeIndex === index 
              ? "bg-gray-800 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}

export default Filters;