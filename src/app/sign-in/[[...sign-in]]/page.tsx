'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = '/dashboard';
    } else if (isLoaded) {
      window.location.href = '/onboarding';
    }
  }, [isLoaded, isSignedIn]);

  return null;
} 