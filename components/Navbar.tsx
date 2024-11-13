'use client';
import { Button } from '@/components';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500">
      <Link href="/" className="text-xl font-bold text-white">
        Home
      </Link>
      <div>
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
