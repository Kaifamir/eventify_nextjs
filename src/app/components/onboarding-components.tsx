'use client';

import { SignIn } from "@clerk/nextjs";
import { SignUp } from '@clerk/nextjs';

// Feature Item Component
export function FeatureItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start space-x-4 group hover:bg-gray-800/50 p-4 rounded-xl transition-all duration-300">
      <div className="flex-shrink-0 p-3 bg-gray-800 rounded-lg group-hover:bg-[#2271e6] transition-colors duration-300">
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-roboto font-medium text-lg text-white group-hover:text-[#2271e6] transition-colors duration-300">{title}</h3>
        <p className="font-roboto text-gray-400 mt-1 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// Clerk Auth Component
export const AuthComponent = ({ mode }: { mode: 'sign-in' | 'sign-up' }) => {
  const appearance = {
    elements: {
      formButtonPrimary: {
        backgroundColor: '#2271e6',
        fontSize: '17px',
        fontWeight: '400',
        padding: '18px 24px',
        '&:hover': {
          backgroundColor: '#1b64d9',
        },
      },
      card: {
        backgroundColor: 'rgba(30, 30, 30, 0.5)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.2rem',
      },
      headerTitle: {
        fontSize: '24px',
        fontWeight: '500',
        letterSpacing: '-0.02em',
      },
      headerSubtitle: {
        fontSize: '17px',
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: '-0.01em',
      },
      formFieldLabel: {
        fontSize: '14px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: '-0.01em',
      },
      formFieldInput: {
        backgroundColor: 'rgba(40, 40, 40, 0.5)',
        fontSize: '17px',
        padding: '14px',
        borderRadius: '0.8rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      footerActionLink: {
        color: '#2271e6',
        fontSize: '15px',
        fontWeight: '400',
        '&:hover': {
          color: '#1b64d9',
        },
      },
      dividerLine: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      dividerText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '13px',
      },
      socialButtonsBlockButton: {
        backgroundColor: 'rgba(40, 40, 40, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.8rem',
        fontSize: '17px',
        padding: '14px',
        '&:hover': {
          backgroundColor: 'rgba(50, 50, 50, 0.5)',
        },
      },
    },
    variables: {
      colorPrimary: '#2271e6',
      colorBackground: 'transparent',
      colorText: '#ffffff',
      colorTextSecondary: 'rgba(255, 255, 255, 0.6)',
      colorInputBackground: 'rgba(40, 40, 40, 0.5)',
      colorInputText: '#ffffff',
    },
  };

  return mode === 'sign-in' ? (
    <SignIn 
      appearance={appearance}
      routing="path"
      path="/onboarding"
      signUpUrl="/onboarding/sign-up"
      afterSignInUrl="/dashboard"
    />
  ) : (
    <SignUp 
      appearance={appearance}
      routing="path"
      path="/onboarding/sign-up"
      signInUrl="/onboarding"
      afterSignUpUrl="/dashboard"
    />
  );
};

// Logo Component
export function Logo() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-[3.5rem] font-roboto font-bold tracking-tight text-white">
        event<span className="text-[#2271e6]">ify</span>
        <span className="text-[#2271e6]">.</span>
      </h1>
      <p className="text-xl font-roboto text-gray-400">
        Your all-in-one event planning solution
      </p>
    </div>
  );
}

// Features Section Component
export function FeaturesGrid() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-roboto font-semibold text-white text-center mb-8">
        Everything you need to create amazing events
      </h2>
      <div className="space-y-4">
        <FeatureItem 
          icon="✨"
          title="Effortless Planning"
          text="Streamline your event planning with intuitive tools and smart automation that adapt to your needs."
        />
        <FeatureItem 
          icon="🤝"
          title="Trusted Partners"
          text="Connect with our curated network of local vendors and service providers, all vetted for quality."
        />
        <FeatureItem 
          icon="🎯"
          title="Smart Recommendations"
          text="Get personalized suggestions for venues, themes, and vendors based on your preferences and style."
        />
        <FeatureItem 
          icon="📊"
          title="Unified Dashboard"
          text="Manage every aspect of your event from a beautifully designed interface that puts you in control."
        />
      </div>
    </div>
  );
}
