"use client";
import GoogleSignIn from "./auth/_components/GoogleSignIn";

export default function Home() {
  return (

    <main className="min-h-screen flex flex-col items-center">
        <h1 className="text-black">hi</h1>
      <GoogleSignIn/>
    </main>
  );
}
