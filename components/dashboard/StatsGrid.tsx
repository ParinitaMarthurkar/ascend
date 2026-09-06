"use client";

import { useEffect, useState } from "react";
import { loadUserProgress } from "@/lib/storage";

export default function StatsGrid() {
    const [readiness, setReadiness] = useState(0);
    const [streak, setStreak] = useState(0);
    const [xp, setXP] = useState(0);

    useEffect(() => {
        const progress = loadUserProgress();

        setReadiness(progress.readiness);
        setStreak(progress.streak);
        setXP(progress.xp);
    }, []);

    return (
        <section className="grid grid-cols-3 gap-3">

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs text-[var(--text-secondary)]">
                    Readiness
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {readiness}%
                </h2>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs text-[var(--text-secondary)]">
                    Streak
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {streak}
                </h2>

                <p className="text-xs text-[var(--text-secondary)]">
                    days
                </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs text-[var(--text-secondary)]">
                    XP
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {xp}
                </h2>
            </div>

        </section>
    );
}