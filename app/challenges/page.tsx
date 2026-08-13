import BottomNav from "@/components/navigation/BottomNav";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { challenges } from "@/lib/challenges";

export default function ChallengesPage() {
    const completed = challenges.filter((c) => c.completed).length;
    const totalXP = challenges
        .filter((c) => c.completed)
        .reduce((sum, c) => sum + c.xp, 0);

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-8 pb-24">
            <div
                className="mx-auto w-full max-w-md"
                style={{ margin: "0 auto" }}
            >
                {/* Header */}
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Earn rewards while learning
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Challenges
                    </h1>
                </div>

                {/* Stats */}
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

                {/* Challenge List */}
                <div className="mt-8 space-y-5">
                    {challenges.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            title={challenge.title}
                            description={challenge.description}
                            xp={challenge.xp}
                            completed={challenge.completed}
                        />
                    ))}
                </div>

            </div>

            <BottomNav />
        </main>
    );
}