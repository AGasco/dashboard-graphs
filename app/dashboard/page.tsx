import { authOptions } from 'app/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {session.user?.name || session.user?.email}!
      </h1>
      <DashboardContent />
    </div>
  );
};

export default DashboardPage;
