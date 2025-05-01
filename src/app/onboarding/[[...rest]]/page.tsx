'use client';

import { Logo, AuthComponent, FeaturesGrid } from '../../components/onboarding-components';
import { usePathname } from 'next/navigation';

export default function OnboardingPage() {
  const pathname = usePathname();
  const isSignUp = pathname === '/onboarding/sign-up';

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      
      {/* Content */}
      <div className="flex flex-1 relative max-w-[1400px] mx-auto">
        {/* Left Section */}
        <div className="flex-1 p-8 xl:p-12 flex items-center">
          <div className="space-y-12">
            <Logo />
            <FeaturesGrid />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-8 xl:p-12">
          <div className="w-full max-w-[380px]">
            <AuthComponent mode={isSignUp ? 'sign-up' : 'sign-in'} />
          </div>
        </div>
      </div>
    </div>
  );
} 