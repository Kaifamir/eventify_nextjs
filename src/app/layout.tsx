import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { roboto } from './fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventify',
  description: 'Your all-in-one event planning solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      signInUrl="/onboarding"
      signUpUrl="/onboarding/sign-up"
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.className} font-roboto antialiased`} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
