"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();

  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  return (
    <header className="px-4 lg:px-6 my-4 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between bg-[#f9f9f9] gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-base lg:text-lg font-medium truncate">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to To Do App!"}
        </h1>
        <p className="text-xs lg:text-sm text-gray-600">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <button
          className="px-4 lg:px-8 py-2 lg:py-3 bg-[#3aafae] text-white rounded-[50px] text-sm lg:text-base
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out flex-shrink-0"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          <span className="hidden sm:inline">
            {userId ? "Add a new Task" : "Login / Register"}
          </span>
          <span className="sm:hidden">
            {userId ? "Add Task" : "Login"}
          </span>
        </button>

        <div className="flex gap-2 lg:gap-4 items-center">
          <Link
            href="https://github.com/Huytulato/ToDoApp"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[36px] w-[36px] lg:h-[40px] lg:w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] flex-shrink-0"
          >
            {github}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
