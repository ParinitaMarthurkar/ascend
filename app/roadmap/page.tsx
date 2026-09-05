"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TimelineItem from "@/components/roadmap/TimelineItem";
import Button from "@/components/ui/Button";
import BottomNav from "@/components/navigation/BottomNav";

import { roadmap } from "@/lib/roadmap";
import { loadUserProgress } from "@/lib/storage";

export default function JourneyPage() {
    const router = useRouter();

    const [userProgress, setUserProgress] = useState<any>(null);

    useEffect(() => {
        setUserProgress(loadUserProgress());
    }, []);

    if (!userProgress) {
        return null;
    }

    const currentRoadmap = roadmap[userProgress.selectedGoal];

    if (!currentRoadmap) {
        return null;
    }

    const currentStage = currentRoadmap.stages.find(
        (stage) => !userProgress.completedStages.includes(stage.id)
    );

    console.log("CURRENT STAGE:", currentStage);

    function handleContinue() {
        console.log("CURRENT STAGE:", currentStage);

        if (!currentStage) return;

        router.push(`/learn/${currentStage.id}`);
    }

    return (
        <>
            <main className="bg-[var(--background)]">
                <div className="mx-auto min-h-screen w-full max-w-md px-6 py-10 pb-56">

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
                                isLast={
                                    index === currentRoadmap.stages.length - 1
                                }
                            />
                        ))}
                    </section>

                </div>
            </main>

            <div className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent px-6 pb-4 pt-8">
                <div className="mx-auto w-full max-w-md">
                    <Button
                        fullWidth
                        onClick={handleContinue}
                        disabled={!currentStage}
                    >
                        Continue Learning
                    </Button>
                </div>
            </div>

            <BottomNav />
        </>
    );
}