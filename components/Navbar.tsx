'use client';
import { Button } from '@/components';
import { THEME_LIGHT } from '@/consts';
import { useTheme } from '@/contexts';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between h-12 px-4 py-2 bg-blue-500">
      <Link href="/" className="text-xl font-bold text-white">
        Home
      </Link>
      <div className="flex items-center space-x-2">
        <Button onClick={toggleTheme}>
          Switch to
          {theme === THEME_LIGHT ? (
            <MdDarkMode className="mx-1" />
          ) : (
            <MdOutlineLightMode className="mx-1" />
          )}
          Mode
        </Button>
        {session ? (
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Link href="/register" className="text-white">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
