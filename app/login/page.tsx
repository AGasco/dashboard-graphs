'use client';
import { SocialsSignIn } from '@/components';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundAccent">
      <SocialsSignIn />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
