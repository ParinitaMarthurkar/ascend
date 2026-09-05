"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { challenges } from "@/lib/challenges";
import {
    loadChallengeProgress,
    loadUserProgress,
    ChallengeProgressMap,
} from "@/lib/storage";
export default function ChallengesPage() {
    const [progress, setProgress] =
        useState<ChallengeProgressMap>({});

    useEffect(() => {
        function refreshProgress() {
            const challengeProgress = loadChallengeProgress();
            const userProgress = loadUserProgress();

            const streak = userProgress.streak;

            const updatedChallenges = {
                ...challengeProgress,
                3: {
                    started: streak > 0,
                    completed: streak >= 7,
                    progress: Math.min(streak, 7),
                    startedAt:
                        challengeProgress[3]?.startedAt ?? null,
                    elapsedSeconds:
                        challengeProgress[3]?.elapsedSeconds ?? 0,
                    lastActiveDate:
                        userProgress.lastLearningDate,
                },
            };

            setProgress(updatedChallenges);
        }

        refreshProgress();
    }, []);

    const completed = challenges.filter(
        (challenge) => progress[challenge.id]?.completed
    ).length;

    const totalXP = challenges
        .filter((challenge) => progress[challenge.id]?.completed)
        .reduce((sum, challenge) => sum + challenge.xp, 0);

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="mx-auto w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Earn rewards while learning
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Challenges
                    </h1>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Completed
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {completed}/{challenges.length}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm">
                        <p className="text-sm text-[var(--text-secondary)]">
                            XP Earned
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {totalXP}
                        </h2>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    {challenges.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            id={challenge.id}
                            title={challenge.title}
                            description={challenge.description}
                            xp={challenge.xp}
                            type={challenge.type}
                            target={challenge.target}
                        />
                    ))}
                </div>
            </div>

            <BottomNav />
        </main>
    );
}