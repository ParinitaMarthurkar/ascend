"use client";

import { useEffect, useState } from "react";

import { loadUserProgress } from "@/lib/storage";
import { roadmap } from "@/lib/roadmap";

export default function UpcomingCard() {
    const [nextStage, setNextStage] = useState<{
        title: string;
        duration: string;
    } | null>(null);

    useEffect(() => {
        const progress = loadUserProgress();
        const currentRoadmap = roadmap[progress.selectedGoal];

        if (!currentRoadmap) return;

        const currentStageIndex = currentRoadmap.stages.findIndex(
            (stage) => !progress.completedStages.includes(stage.id)
        );

        if (
            currentStageIndex !== -1 &&
            currentStageIndex + 1 < currentRoadmap.stages.length
        ) {
            const upcoming = currentRoadmap.stages[currentStageIndex + 1];

            setNextStage({
                title: upcoming.title,
                duration: upcoming.duration,
            });
        }
    }, []);

    if (!nextStage) {
        return null;
    }

    return (
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-secondary)]">
                Up Next
            </p>

            <h2 className="mt-2 text-xl font-semibold">
                {nextStage.title}
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Estimated time: {nextStage.duration}
            </p>
        </section>
    );
}