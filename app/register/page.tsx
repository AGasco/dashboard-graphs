'use client';
import { SocialsSignIn } from '@/components';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundAccent">
      <SocialsSignIn />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
