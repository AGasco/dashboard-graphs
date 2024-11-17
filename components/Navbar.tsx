'use client';
import { Button } from '@/components';
import { THEME_LIGHT } from '@/consts';
import { useTheme } from '@/contexts';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  const renderSignOut = pathname !== '/login' && pathname !== '/register';

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
        {session && renderSignOut ? (
          <Button
            className="bg-red-500 hover:bg-red-600 min-w-[90px]"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="white" size="23" /> : 'Sign Out'}
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
