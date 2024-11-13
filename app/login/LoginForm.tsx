'use client';
import { Button, Input } from '@/components';
import { PROVIDER_CREDENTIALS } from 'consts';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const initialState = { email: '', password: '' };

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.type]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await signIn(PROVIDER_CREDENTIALS, {
      email,
      password,
      redirect: false
    });

    if (res && !res.error) {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-2xl font-bold text-center">Sign In</h1>
      <div className="mb-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
