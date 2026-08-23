"use client";

import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/storage";
import { goals } from "@/lib/goals";
import Hero from "@/components/dashboard/Hero";
import MissionCard from "@/components/dashboard/MissionCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingCard from "@/components/dashboard/UpcomingCard";
import MentorCard from "@/components/dashboard/MentorCard";
import BottomNav from "@/components/navigation/BottomNav";

export default function DashboardPage() {
    const [goalName, setGoalName] = useState("AI Engineer");

    useEffect(() => {
        const savedGoal = loadProgress<string | null>("selectedGoal", null);

        if (savedGoal) {
            const goal = goals.find((g) => g.id === savedGoal);

            if (goal) {
                setGoalName(goal.title);
            }
        }
    }, []);
    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                <Hero goal={goalName} />

                <div className="mt-6">
                    <MissionCard />
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