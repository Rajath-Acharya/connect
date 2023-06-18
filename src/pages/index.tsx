import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Connect</title>
        <meta name="description" content="Connect with your teammates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
            </p>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn('google')}
            >
              {sessionData ? "Sign out" : "Sign in with Google"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}