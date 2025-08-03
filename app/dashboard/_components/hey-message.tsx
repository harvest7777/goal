"use client";
import { useEffect, useState } from "react";

const messages = [
  "welcome back, let's make today count.",
  "hey, you're here, that's already something special.",
  "remember when things felt possible? they still are.",
  "small steps today, big wins tomorrow.",
  "you made it here, and that's a sign to keep going.",
  "take a breath, the world can wait while you create.",
  "one tiny action can change your whole week.",
  "the best time to start was yesterday, the next best time is now.",
  "your goals miss you, go say hi.",
  "turn that energy into something amazing.",
  "remember why you started, it's still waiting for you.",
  "every big dream starts with a small move like this.",
  "imagine where you’ll be if you keep going today.",
  "your future self is already cheering for you.",
  "tiny progress is still progress, keep stacking it.",
  "make this moment yours, even if it’s just a little bit.",
  "what you do today matters more than you think.",
  "it doesn’t have to be perfect, it just has to start.",
  "it's never too late to salvage a day of doomscrolling.",
  "you came here for a reason—let’s honor that."
];

type props = {
  className?: string;
}
export default function HeyMessage({ className }: props) {
  const [message, setMessage] = useState(" ");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  return (
    <div className={`${className}`}>
      <h1 className="text-center">{message}</h1>
    </div>
  );
}
