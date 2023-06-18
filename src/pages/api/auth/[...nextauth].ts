import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
 providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email"},
      password: {  label: "Password", type: "password" }
    },
    authorize(credentials, _) {
      const {email, password} = credentials as {
        email: string,
        password: string,
      };
      if(!email) {
        throw new Error('Email is required');
      }
      if(!password) {
        throw new Error('Password is required');
      }
      return {id: '1', email: ''}
    }
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID || '',
   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
 ],
 session: {
  strategy: 'jwt',
 },
 secret: process.env.JWT_SECRET,
 callbacks: {
    jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session }) {
      return session
    },
  }
} as AuthOptions;

export default NextAuth(authOptions);
