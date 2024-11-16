'use client';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const initialState = { name: '', email: '', password: '' };

const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const router = useRouter();

  const { name, email, password } = userInfo;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
  };

  return (
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
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
