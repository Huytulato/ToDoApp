"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();
  return (
    <div className="m-4 lg:m-6">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        onClick={openProfileModal}
      >
        <div>
          <Image
            src={user?.photo}
            alt="avatar"
            width={60}
            height={60}
            className="rounded-full lg:w-[70px] lg:h-[70px]"
          />
        </div>
        <div>
          <h1 className="flex flex-col text-lg lg:text-xl">
            <span className="font-medium">Hello,</span>
            <span className="font-bold truncate">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-4 lg:mt-6 flex flex-col gap-6 lg:gap-8">
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <div className="text-gray-400">
            <p className="text-xs lg:text-sm">Total Tasks:</p>
            <p className="pl-2 lg:pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-2xl lg:text-4xl text-[#333]">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-xs lg:text-sm">In Progress:</p>
            <p className="pl-2 lg:pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-2xl lg:text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-xs lg:text-sm">Open Tasks:</p>
            <p className="pl-2 lg:pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-2xl lg:text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p className="text-xs lg:text-sm">Completed:</p>
            <p className="pl-2 lg:pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-2xl lg:text-4xl text-[#333]">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-6 lg:mt-8 font-medium text-sm lg:text-base">Activity</h3>
    </div>
  );
}

export default Profile; 