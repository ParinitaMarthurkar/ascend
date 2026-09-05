"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { loadUserProgress } from "@/lib/storage";
import { goals } from "@/lib/goals";
import { roadmap } from "@/lib/roadmap";

import Hero from "@/components/dashboard/Hero";
import MissionCard from "@/components/dashboard/MissionCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingCard from "@/components/dashboard/UpcomingCard";
import MentorCard from "@/components/dashboard/MentorCard";
import BottomNav from "@/components/navigation/BottomNav";

export default function DashboardPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [goalName, setGoalName] = useState("AI Engineer");
    const [missionTitle, setMissionTitle] = useState("");
    const [missionDuration, setMissionDuration] = useState("");

    useEffect(() => {
        const progress = loadUserProgress();

        const goal = goals.find(
            (g) => g.id === progress.selectedGoal
        );

        if (goal) {
            setGoalName(goal.title);
        }

        const currentRoadmap = roadmap[progress.selectedGoal];

        if (currentRoadmap) {
            const currentStage = currentRoadmap.stages.find(
                (stage) =>
                    !progress.completedStages.includes(stage.id)
            );

            if (currentStage) {
                setMissionTitle(currentStage.title);
                setMissionDuration(currentStage.duration);
            }
        }
    }, [pathname]);

    function handleContinueLearning() {
        router.push("/roadmap");
    }

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                <Hero goal={goalName} />

                <div className="mt-6">
                    <MissionCard
                        title={missionTitle}
                        duration={missionDuration}
                        onContinue={handleContinueLearning}
                    />
                </div>

                <div className="mt-6">
                    <StatsGrid />
                </div>

                <div className="mt-6">
                    <UpcomingCard />
                </div>

                <div className="mt-6">
                    <MentorCard />
                </div>
            </div>

            <BottomNav />
        </main>
    );
}