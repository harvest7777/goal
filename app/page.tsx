"use client";
import GoogleSignIn from "./auth/_components/GoogleSignIn";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center align-middle justify-center">
      <div className="sm:w-3/5 w-4/5 mt-20">
        <h1 className="text-center">hello... again</h1>
        <br></br>
        <p>if you&apos;re here you probably already know what this is for</p>
        <br></br>
        <p>
          shortly after discontinuing imalockin i realized i am heavily reliant
          on time management systems, so i spun this up. super basic version
          without the realtime stuff... ill reveive the project once i have more
          time.
        </p>
        <br></br>
        <p>thank you all</p>
        <p>ryan 🤍</p>
      </div>
      <GoogleSignIn />
    </div>
  );
}
