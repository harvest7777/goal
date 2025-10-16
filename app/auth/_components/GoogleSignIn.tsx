"use client";
import supabase from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";

export default function GoogleSignIn() {
  const handleClick = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };
  return (
    <Button onClick={handleClick} className="bg-blue-500">
      sign in with google
    </Button>
  );
}
