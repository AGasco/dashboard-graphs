import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from './api/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const linkClassName =
    'text-sm md:text-2xl w-max px-6 py-3 mt-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors';

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center">
      {session ? (
        <Link href="/dashboard" className={linkClassName}>
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="px-3 text-center text-lg md:text-3xl lg:text-5xl max-w-[80vw]">
            Welcome, please sign in to see the dashboard
          </h1>
          <Link href="/register" className={linkClassName}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
