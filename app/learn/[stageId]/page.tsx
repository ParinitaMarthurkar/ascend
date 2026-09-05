"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import BottomNav from "@/components/navigation/BottomNav";

import { roadmap } from "@/lib/roadmap";
import { lessons } from "@/lib/lessons";
import {
    loadUserProgress,
    completeStage,
} from "@/lib/storage";

export default function LearnPage() {
    const params = useParams();
    const router = useRouter();

    const [userProgress, setUserProgress] = useState<any>(null);

    const stageId = Number(params.stageId);

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

    const stage = currentRoadmap.stages.find(
        (item) => item.id === stageId
    );

    if (!stage) {
        return null;
    }

    const isCompleted =
        userProgress.completedStages.includes(stage.id);

    const lesson = lessons.find(
        (item) => item.stageId === stage.id
    );

    if (!lesson) {
        return null;
    }

    function handleComplete() {
        if (isCompleted) {
            router.push("/roadmap");
            return;
        }

        completeStage(stageId);

        router.push("/roadmap");
    }

    return (
        <>
            <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-40">
                <div className="mx-auto w-full max-w-md">

                    <button
                        onClick={() => router.push("/roadmap")}
                        className="text-sm text-[var(--text-secondary)]"
                    >
                        ← Back to Journey
                    </button>

                    <div className="mt-8">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Current Mission
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            {stage.title}
                        </h1>

                        <p className="mt-3 text-[var(--text-secondary)]">
                            Estimated time: {stage.duration}
                        </p>
                    </div>

                    <section className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">

                        <p className="text-sm font-medium text-[var(--primary)]">
                            Lesson
                        </p>

                        <h2 className="mt-3 text-2xl font-semibold">
                            {lesson.title}
                        </h2>

                        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                            {lesson.description}
                        </p>

                        <div className="mt-6 rounded-2xl bg-[var(--background)] p-5">
                            <h3 className="font-semibold">
                                What you'll learn
                            </h3>

                            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                                {lesson.topics.map((topic) => (
                                    <li key={topic}>
                                        • {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </section>
                </div>
            </main>

            <div className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent px-6 pb-4 pt-8">
                <div className="mx-auto w-full max-w-md">
                    <Button
                        fullWidth
                        onClick={handleComplete}
                    >
                        {isCompleted
                            ? "Back to Journey"
                            : "Complete Stage"}
                    </Button>
                </div>
            </div>

            <BottomNav />
        </>
    );
}