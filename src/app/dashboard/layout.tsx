'use client';

import { Sidebar } from "@/app/components/dashboard/sidebar";
import { UserButton } from "@/app/components/dashboard/user-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      <div className="relative flex h-full">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-10">
          <Sidebar />
        </div>
        <main className="flex-1 md:pl-72 relative">
          {/* Header */}
          <div className="fixed top-0 right-0 p-4 z-50 md:p-6">
            <UserButton />
          </div>
          <div className="h-full p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 