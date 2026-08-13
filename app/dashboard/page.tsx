import Hero from "@/components/dashboard/Hero";
import MissionCard from "@/components/dashboard/MissionCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingCard from "@/components/dashboard/UpcomingCard";
import MentorCard from "@/components/dashboard/MentorCard";
import BottomNav from "@/components/navigation/BottomNav";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                <Hero />

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