import { prisma } from '@/lib';
import { User } from '@/types';
import bcrypt from 'bcryptjs';

export async function verifyUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = (await prisma.user.findUnique({ where: { email } })) as User;
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;
}
