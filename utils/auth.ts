import { users } from '@/data';
import { User } from '@/types';
import bcrypt from 'bcryptjs';

export async function verifyUser(
  email: string,
  password: string
): Promise<User | null> {
  // Simulating a database call with some delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user = users.find((user) => user.email === email);

  if (user && (await bcrypt.compare(password, user.password))) return user;

  return null;
}
