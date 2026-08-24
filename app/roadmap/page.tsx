"use client";
import TimelineItem from "@/components/roadmap/TimelineItem";
import Button from "@/components/ui/Button";
import BottomNav from "@/components/navigation/BottomNav";

import { roadmap } from "@/lib/roadmap";


import { useEffect, useState } from "react";
import {
    loadUserProgress,
    completeCurrentStage,
    loadProgress,
} from "@/lib/storage";

export default function JourneyPage() {
    const [userProgress, setUserProgress] = useState<any>(null);

    useEffect(() => {
        setUserProgress(loadUserProgress());
    }, []);

    if (!userProgress) {
        return null;
    }

    const currentRoadmap = roadmap[userProgress.selectedGoal];
    function handleContinue() {
        const updated = completeCurrentStage();
        setUserProgress(updated);
    }
    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-10 pb-24">
            <div
                className="w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                <p className="text-sm text-[var(--text-secondary)]">
                    Your Journey
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    {currentRoadmap.title}
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Follow your personalized learning path.
                </p>

                <section className="mt-10">
                    {currentRoadmap.stages.map((stage, index) => (
                        <TimelineItem
                            key={stage.id}
                            title={stage.title}
                            duration={stage.duration}
                            completed={userProgress.completedStages.includes(stage.id)}
                            isLast={index === currentRoadmap.stages.length - 1}
                        />
                    ))}
                </section>

                <Button
                    fullWidth
                    className="mt-6"
                    onClick={handleContinue}
                >
                    Continue Learning
                </Button>
            </div>

            <BottomNav />
        </main>
    );
}