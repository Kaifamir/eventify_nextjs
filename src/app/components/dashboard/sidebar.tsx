'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import { 
  CalendarDays, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Wallet,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Events',
      icon: CalendarDays,
      href: '/dashboard',
      active: pathname === '/dashboard' || pathname === '/dashboard/events',
    },
    {
      label: 'Todos',
      icon: CheckSquare,
      href: '/dashboard/todos',
      active: pathname === '/dashboard/todos',
    },
    {
      label: 'Budget',
      icon: Wallet,
      href: '/dashboard/budget',
      active: pathname === '/dashboard/budget',
    },
    {
      label: 'Guests',
      icon: Users,
      href: '/dashboard/guests',
      active: pathname === '/dashboard/guests',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      active: pathname === '/dashboard/analytics',
    },
  ];

  return (
    <div className={cn("space-y-4 py-4 flex flex-col h-full bg-[#1a1a1a]/50 backdrop-blur-xl border-r border-white/10 text-white", className)} {...props}>
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold tracking-tight">
            event<span className="text-[#2271e6]">ify</span>
            <span className="text-[#2271e6]">.</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`
                text-sm group flex p-3 w-full justify-start font-medium cursor-pointer 
                hover:text-white hover:bg-[#2271e6]/10 rounded-lg transition
                ${route.active ? 'text-white bg-[#2271e6]/10' : 'text-zinc-400'}
              `}
            >
              <div className="flex items-center flex-1">
                <route.icon className={`h-5 w-5 mr-3`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="px-3 py-2">
        <Link
          href="/dashboard/ask-ai"
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer 
            hover:text-white hover:bg-[#2271e6]/10 rounded-lg transition text-zinc-400"
        >
          <div className="flex items-center flex-1">
            <BrainCircuit className="h-5 w-5 mr-3" />
            Ask AI
          </div>
        </Link>
      </div>
    </div>
  );
} 