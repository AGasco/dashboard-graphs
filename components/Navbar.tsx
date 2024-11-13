'use client';
import { Button } from '@/components';
import { THEME_LIGHT } from '@/consts';
import { useTheme } from '@/contexts';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500">
      <Link href="/" className="text-xl font-bold text-white">
        Home
      </Link>
      <div className="flex items-center space-x-4">
        <Button onClick={toggleTheme}>
          Switch to {theme === THEME_LIGHT ? 'Dark' : 'Light'} Mode
        </Button>
        {session ? (
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Link href="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
