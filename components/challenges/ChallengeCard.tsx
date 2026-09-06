"use client";

import { useEffect, useState } from "react";

import {
    loadChallengeProgress,
    saveChallengeProgress,
    loadUserProgress,
    completeChallenge,
    ChallengeProgressMap,
} from "@/lib/storage";

interface ChallengeCardProps {
    id: number;
    title: string;
    description: string;
    xp: number;
    type: "mission" | "timer" | "streak";
    target: number;
}

export default function ChallengeCard({
    id,
    title,
    description,
    xp,
    type,
    target,
}: ChallengeCardProps) {
    const [progress, setProgress] =
        useState<ChallengeProgressMap>({});

    const [isRunning, setIsRunning] =
        useState(false);

    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const saved = loadChallengeProgress();
        const userProgress = loadUserProgress();

        setStreak(userProgress.streak);

        let updated = saved;

        // Sync Challenge 4 with Python Fundamentals completion.
        if (
            id === 4 &&
            userProgress.completedStages.includes(1)
        ) {
            const challenge = saved[4];

            updated = {
                ...saved,
                4: {
                    started: true,
                    completed: true,
                    progress: 1,
                    startedAt:
                        challenge?.startedAt ?? null,
                    elapsedSeconds:
                        challenge?.elapsedSeconds ?? 0,
                    lastActiveDate:
                        challenge?.lastActiveDate ?? null,
                    xpAwarded:
                        challenge?.xpAwarded ?? false,
                },
            };

            saveChallengeProgress(updated);

            // Award the 500 XP only once.
            completeChallenge(4, xp);

            // Reload after awarding XP so xpAwarded is reflected.
            updated = loadChallengeProgress();
        }

        const challenge = updated[id];

        if (
            challenge &&
            typeof challenge.elapsedSeconds !== "number"
        ) {
            updated = {
                ...updated,
                [id]: {
                    ...challenge,
                    elapsedSeconds: 0,
                },
            };

            saveChallengeProgress(updated);
        }

        setProgress(updated);
    }, [id]);

    const challenge = progress[id];

    const completed =
        challenge?.completed ?? false;

    const currentProgress =
        type === "streak"
            ? streak
            : challenge?.progress ?? 0;

    function handleStart() {
        const current = loadChallengeProgress();

        const updated = {
            ...current,
            [id]: {
                started: true,
                completed: false,
                progress: current[id]?.progress ?? 0,
                startedAt: new Date().toISOString(),
                elapsedSeconds:
                    current[id]?.elapsedSeconds ?? 0,
                lastActiveDate:
                    new Date().toISOString().split("T")[0],
                xpAwarded:
                    current[id]?.xpAwarded ?? false,
            },
        };

        saveChallengeProgress(updated);
        setProgress(updated);

        if (type === "timer") {
            setIsRunning(true);
        }
    }

    function handlePause() {
        const current = loadChallengeProgress();
        const currentChallenge = current[id];

        if (!currentChallenge?.startedAt) {
            setIsRunning(false);
            return;
        }

        const startedAt =
            new Date(
                currentChallenge.startedAt
            ).getTime();

        const elapsedThisSession = Math.floor(
            (Date.now() - startedAt) / 1000
        );

        const totalElapsed = Math.min(
            currentChallenge.elapsedSeconds +
            elapsedThisSession,
            target * 60
        );

        const newProgress = Math.floor(
            totalElapsed / 60
        );

        const updated = {
            ...current,
            [id]: {
                ...currentChallenge,
                startedAt: null,
                elapsedSeconds: totalElapsed,
                progress: newProgress,
                completed:
                    totalElapsed >= target * 60,
            },
        };

        saveChallengeProgress(updated);
        setProgress(updated);
        setIsRunning(false);
    }

    function handleResume() {
        const current = loadChallengeProgress();
        const currentChallenge = current[id];

        if (
            !currentChallenge ||
            currentChallenge.completed
        ) {
            return;
        }

        const updated = {
            ...current,
            [id]: {
                ...currentChallenge,
                startedAt: new Date().toISOString(),
            },
        };

        saveChallengeProgress(updated);
        setProgress(updated);
        setIsRunning(true);
    }

    useEffect(() => {
        if (!isRunning || type !== "timer") {
            return;
        }

        const interval = setInterval(() => {
            setProgress((current) => {
                const challenge = current[id];

                if (
                    !challenge ||
                    challenge.completed ||
                    !challenge.startedAt
                ) {
                    return current;
                }

                const startedAt =
                    new Date(
                        challenge.startedAt
                    ).getTime();

                const elapsedThisSession = Math.floor(
                    (Date.now() - startedAt) / 1000
                );

                const totalElapsed = Math.min(
                    challenge.elapsedSeconds +
                    elapsedThisSession,
                    target * 60
                );

                const newProgress = Math.floor(
                    totalElapsed / 60
                );

                const isCompleted =
                    totalElapsed >= target * 60;

                const updated = {
                    ...current,
                    [id]: {
                        ...challenge,
                        progress: newProgress,
                        completed: isCompleted,
                    },
                };

                saveChallengeProgress(updated);

                if (isCompleted) {
                    setIsRunning(false);

                    completeChallenge(id, xp);
                }

                return updated;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [id, isRunning, target, type, xp]);

    return (
        <div
            className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${completed
                ? "border-green-300 bg-green-50"
                : "border-[var(--border)] bg-white hover:-translate-y-1 hover:shadow-md"
                }`}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {title}
                </h2>

                <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-sm text-white">
                    +{xp} XP
                </span>
            </div>

            <p className="mt-3 text-sm text-[var(--text-secondary)]">
                {description}
            </p>

            {type === "timer" &&
                challenge?.started && (
                    <div className="mt-5">
                        <div className="flex justify-between text-sm">
                            <span>Progress</span>

                            <span>
                                {currentProgress}/{target} minutes
                            </span>
                        </div>

                        <div className="mt-2 h-3 rounded-full bg-[var(--border)]">
                            <div
                                className="h-full rounded-full bg-[var(--primary)] transition-all"
                                style={{
                                    width: `${Math.min(
                                        (currentProgress /
                                            target) *
                                        100,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                )}

            {type === "streak" && (
                <div className="mt-5">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>

                        <span>
                            {currentProgress}/{target} days
                        </span>
                    </div>

                    <div className="mt-2 h-3 rounded-full bg-[var(--border)]">
                        <div
                            className="h-full rounded-full bg-[var(--primary)] transition-all"
                            style={{
                                width: `${Math.min(
                                    (currentProgress /
                                        target) *
                                    100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="mt-5">
                {completed ? (
                    <span className="font-medium text-green-600">
                        ✓ Completed
                    </span>
                ) : type === "streak" ? (
                    challenge?.started ? (
                        <span className="text-sm text-[var(--text-secondary)]">
                            Keep learning every day
                        </span>
                    ) : (
                        <button
                            onClick={handleStart}
                            className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white transition hover:opacity-90"
                        >
                            Start Challenge
                        </button>
                    )
                ) : challenge?.started ? (
                    type === "timer" ? (
                        <button
                            onClick={
                                isRunning
                                    ? handlePause
                                    : handleResume
                            }
                            className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white transition hover:opacity-90"
                        >
                            {isRunning
                                ? "Pause"
                                : "Resume"}
                        </button>
                    ) : (
                        <span className="text-sm text-[var(--text-secondary)]">
                            In progress
                        </span>
                    )
                ) : (
                    <button
                        onClick={handleStart}
                        className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white transition hover:opacity-90"
                    >
                        Start Challenge
                    </button>
                )}
            </div>
        </div>
    );
}