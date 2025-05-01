'use client';

import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isLoaded, user } = useUser();
  
  if (!isLoaded) {
    return null;
  }

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/onboarding');
  }
}
