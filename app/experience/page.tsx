"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
const levels = [
    {
        id: 1,
        emoji: "🌱",
        title: "Beginner",
        description: "I'm just getting started.",
    },
    {
        id: 2,
        emoji: "📘",
        title: "Some Experience",
        description: "I know the basics and have built a few projects.",
    },
    {
        id: 3,
        emoji: "🚀",
        title: "Advanced",
        description: "I'm comfortable building real-world applications.",
    },
];

export default function ExperiencePage() {
    const router = useRouter();
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
            <div className="w-full max-w-xl">
                <h1 className="text-4xl font-bold text-[var(--text)]">
                    What's your experience level?
                </h1>

                <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">
                    Help us personalize your roadmap.
                </h2>

                <p className="mt-2 leading-7 text-[var(--text-secondary)]">
                    Choose the option that best describes your current skill level.
                </p>

                <div className="mt-8 space-y-4">
                    {levels.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => setSelected(level.id)}
                            className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 ${selected === level.id
                                ? "border-[var(--primary)] bg-[#EEF4EF]"
                                : "border-[var(--border)] bg-white"
                                }`}
                        >
                            <div className="text-3xl">{level.emoji}</div>

                            <h3 className="mt-3 text-xl font-semibold">
                                {level.title}
                            </h3>

                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                {level.description}
                            </p>
                        </button>
                    ))}
                </div>

                <Button
                    fullWidth
                    className="mt-10"
                    disabled={selected === null}
                    onClick={() => router.push("/analysis")}
                >
                    Continue
                </Button>
            </div>
        </main>
    );
}