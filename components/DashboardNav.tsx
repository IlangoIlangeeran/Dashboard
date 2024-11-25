"use client";

import Link from 'next/link';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sections } from '@/public/assets';
import ProModal from './ui/pro-modal';
import { useEffect, useState } from 'react';

const DashboardNav = () => {

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch('/api/userType');
        const data = await response.json();
        setUserType(data);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, []);
  
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link
              href='/dashboard'
              className='flex items-center gap-2 text-lg font-semibold pb-5'
            >
              {/* <img src='/logo.png' alt='' className='w-8/12' /> */}
              bradigo
              <span className='sr-only'>bradigo</span>
            </Link>
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                {section.icon}
                {section.label}
              </Link>
            ))}
          </nav>
          <div className='mt-auto'>
            <ProModal userType={userType} />
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        {/* Optional Search component */}
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      {/* Removed UserButton component from Clerk */}
    </header>
  );
};

export default DashboardNav;
