"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    console.log("useRedirect - loading:", loading, "user:", user, "user.email:", user?.email);
    
    // Only redirect if loading is false and user is not logged in
    if (!loading && (!user || !user.email)) {
      console.log("Redirecting to:", redirect);
      router.push(redirect);
    }

    // watch for changes to user, loading, redirect, router
  }, [user, loading, redirect, router]);
};

export default useRedirect;
