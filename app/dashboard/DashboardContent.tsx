'use client';
import { Button } from '@/components';
import { signOut } from 'next-auth/react';

const DashboardContent = () => {
  return (
    <div>
      {/* TODO GRAPH GOES HERE */}
      <Button
        className="mt-4 bg-red-500 hover:bg-red-600"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default DashboardContent;
