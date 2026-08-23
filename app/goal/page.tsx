"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/goal/GoalCard";
import { goals } from "@/lib/goals";
import { saveProgress } from "@/lib/storage";
export default function GoalPage() {
    const router = useRouter();
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
            <div className="w-full max-w-md">

                <h1 className="text-4xl font-bold text-[var(--text)]">
                    Choose your destination.
                </h1>

                <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">
                    Your personalized roadmap begins here.
                </h2>

                <p className="mt-2 text-[var(--text-secondary)] leading-7">
                    Select a career path and let Ascend guide you every step of the way.
                </p>

                <div className="mt-10 space-y-4">
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            icon={goal.icon}
                            title={goal.title}
                            description={goal.description}
                            selected={selectedGoal === goal.id}
                            onClick={() => {
                                setSelectedGoal(goal.id);
                                saveProgress("selectedGoal", goal.id);
                            }}
                        />
                    ))}
                </div>

                <Button
                    fullWidth
                    className="mt-10"
                    disabled={selectedGoal === null}
                    onClick={() => router.push("/experience")}
                >
                    Continue
                </Button>

            </div>
        </main>
    );
}