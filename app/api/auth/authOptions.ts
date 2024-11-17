import { PROVIDER_CREDENTIALS } from '@/consts';
import { verifyUser } from '@/utils';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      id: PROVIDER_CREDENTIALS,
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await verifyUser(credentials.email, credentials.password);

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email
          };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};
