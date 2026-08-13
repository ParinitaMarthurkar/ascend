"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-6">
      <div className="fade-in flex flex-col items-center">
        <Logo />

        <h1 className="mt-8 text-6xl font-bold tracking-tight text-[var(--text)]">
          Ascend
        </h1>

        <p className="mt-4 max-w-xs text-center text-lg leading-relaxed text-[var(--text-secondary)]">
          Where ambition
          <br />
          meets action.
        </p>
      </div>

      <p className="mt-12 text-sm text-[var(--primary)] animate-pulse">
        Preparing your journey...
      </p>
    </main>
  );
}