"use client";
import GoogleSignIn from "./auth/_components/GoogleSignIn";

export default function Home() {
  return (
    <div>
      <h1 className="text-black">hi</h1>
      <GoogleSignIn/>
    </div>
  );
}
