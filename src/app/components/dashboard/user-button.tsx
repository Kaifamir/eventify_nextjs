'use client';

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export function UserButton() {
  return (
    <ClerkUserButton 
      afterSignOutUrl="/onboarding"
      appearance={{
        elements: {
          avatarBox: "h-10 w-10",
          userButtonPopoverCard: "bg-[#1d1d1f] border border-white/10 text-white",
          userButtonPopoverActionButton: "hover:bg-[#2271e6]/10 text-white",
          userButtonPopoverActionButtonText: "text-white",
          userButtonPopoverFooter: "hidden",
        }
      }}
    />
  );
} 