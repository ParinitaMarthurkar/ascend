"use client";
import BottomNav from "@/components/navigation/BottomNav";
import { useEffect, useState } from "react";
import { loadUserProgress } from "@/lib/storage";
import { goals } from "@/lib/goals";
export default function ProfilePage() {
    const [userProgress, setUserProgress] = useState<ReturnType<typeof loadUserProgress> | null>(null);

    useEffect(() => {
        const progress = loadUserProgress();

        console.log("PROFILE PROGRESS:", progress);

        setUserProgress(progress);
    }, []);

    if (!userProgress) {
        return null;
    }

    const selectedGoal = goals.find(
        (goal) => goal.id === userProgress.selectedGoal
    );
    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="mx-auto w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                {/* Header */}
                <div className="flex flex-col items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)] text-5xl text-white">
                        👤
                    </div>

                    <h1 className="mt-4 text-3xl font-bold">
                        Your Profile
                    </h1>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        {selectedGoal?.title}
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">
                        <span>Career Readiness</span>
                        <strong>{userProgress.readiness}%</strong>
                    </div>

                    <div className="mt-4 h-3 rounded-full bg-[var(--border)]">
                        <div
                            className="h-full rounded-full bg-[var(--primary)]"
                            style={{ width: `${userProgress.readiness}%` }}
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <span>🔥 Current Streak</span>

                        <strong>{userProgress.streak} Days</strong>
                    </div>

                </div>

                {/* Goal */}
                <div className="mt-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                    <h2 className="font-semibold text-lg">
                        Career Goal
                    </h2>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        {selectedGoal?.title}
                    </p>
                </div>

                {/* Settings */}
                <div className="mt-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">

                    <button className="w-full rounded-xl border border-[var(--border)] p-4 text-left transition hover:bg-gray-50">
                        ✏️ Edit Career Goal
                    </button>

                    <button className="mt-4 w-full rounded-xl border border-red-200 p-4 text-left text-red-500 transition hover:bg-red-50">
                        🔄 Reset Progress
                    </button>

                </div>
            </div>

            <BottomNav />
        </main>
    );
}