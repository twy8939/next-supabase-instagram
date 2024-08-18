"use client";

import { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";

export default function Auth() {
  const [view, setView] = useState<"signIn" | "signUp">("signIn");

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-light-blue-50">
      {view === "signIn" ? (
        <SignIn setView={setView} />
      ) : (
        <SignUp setView={setView} />
      )}
    </main>
  );
}
