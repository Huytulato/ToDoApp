import React from "react";
import RegisterForm from "@/app/Components/auth/RegisterForm/RegisterForm";

function page() {
  return (
    <div className="auth-page w-full h-full flex justify-center items-center px-4">
      <RegisterForm />
    </div>
  );
}

export default page;
