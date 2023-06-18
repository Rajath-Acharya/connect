import NextAuth, { type AuthOptions } from "next-auth";

import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID || '',
   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
 ],
 session: {
  strategy: 'jwt',
 },
 secret: process.env.JWT_SECRET
} as AuthOptions;

export default NextAuth(authOptions);
