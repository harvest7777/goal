"use client";
import Sidebar from "./_components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className="flex">
        <Sidebar className="w-64 h-[calc(100vh-56px)] sticky top-14"/>
        <div className="flex-1 p-5">
          {children}
        </div>
      </div>
  );
}
