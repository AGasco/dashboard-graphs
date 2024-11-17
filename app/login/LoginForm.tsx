'use client';
import { Button, Input } from '@/components';
import { PROVIDER_CREDENTIALS } from '@/consts';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const initialState = { email: '', password: '' };

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn(PROVIDER_CREDENTIALS, {
        email,
        password,
        redirect: false
      });

      if (res && !res.error) {
        router.push('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        className="p-6 bg-background rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
        <div className="mb-4">
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader data-testid="spinner" color="white" size={23} />
          ) : (
            'Login'
          )}
        </Button>
      </form>
      <p className="mt-2">
        You don't have an account?{' '}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
