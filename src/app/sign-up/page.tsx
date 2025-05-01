'use client';

import { AuthComponent } from "@/app/components/onboarding-components";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-[380px]">
          <AuthComponent mode="sign-up" />
        </div>
      </div>
    </div>
  );
} 