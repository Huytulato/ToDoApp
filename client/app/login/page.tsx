import React from "react";
import LoginForm from "@/app/Components/auth/LoginForm/LoginForm";

function page() {
  return (
    <div className="auth-page w-full h-full flex justify-center items-center px-4">
      <LoginForm />
    </div>
  );
}

export default page;
