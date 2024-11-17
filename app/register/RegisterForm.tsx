'use client';
import { Button, Input } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const initialState = { name: '', email: '', password: '' };

const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const { name, email, password } = userInfo;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        alert('Registration successful! Please log in.');
        router.push('/login');
      } else {
        const data = await res.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed');
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
        <h1 className="mb-4 text-2xl font-bold text-center">Register</h1>
        <div className="mb-4">
          <Input
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            label="Password"
            name="password"
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
            'Register'
          )}
        </Button>
      </form>
      <p className="mt-2">
        Do you already have an account?{' '}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
