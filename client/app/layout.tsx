import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { TasksProvider } from "@/context/taskContext";
import { Inter } from "next/font/google";
import MiniSidebar from "@/app/Components/MiniSidebar/MiniSidebar";
import Header from "@/app/Components/Header/Header";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SideBarProvider";
import MainLayout from "@/providers/MainLayout";
import GTMInitialiser from "@/providers/GTMInitialiser";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do App",
  description: "Welcome to To Do App",
  icons: {
    icon: "/todoapp.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMInitialiser />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        
        <UserProvider>
          <TasksProvider>
            <Toaster position="top-center" />
            <div className="h-full flex overflow-hidden">
              <MiniSidebar />
              <div className="flex-1 flex flex-col">              
                  <Header />
                  <MainContentLayout>
                  <MainLayout>{children}</MainLayout>
                  <SidebarProvider />
                </MainContentLayout>
              </div>
            </div>
          </TasksProvider>
        </UserProvider>
      </body>
    </html>
  );
}
