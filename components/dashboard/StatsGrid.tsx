"use client";

import { useEffect, useState } from "react";
import { loadUserProgress } from "@/lib/storage";

export default function StatsGrid() {
    const [readiness, setReadiness] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const progress = loadUserProgress();

        setReadiness(progress.readiness);
        setStreak(progress.streak);
    }, []);

    return (
        <section className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="text-sm text-[var(--text-secondary)]">
                    Readiness
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    {readiness}%
                </h2>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="text-sm text-[var(--text-secondary)]">
                    Streak
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    🔥 {streak}
                </h2>
            </div>

        </section>
    );
}