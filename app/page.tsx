import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from './api/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center">
      {session ? (
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Dashboard
        </Link>
      ) : (
        <h1 className="text-5xl">
          Welcome, please sign in to see the dashboard
        </h1>
      )}
    </div>
  );
}
