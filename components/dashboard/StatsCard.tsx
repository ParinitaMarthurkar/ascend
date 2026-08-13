interface StatsCardProps {
    readiness: number;
    streak: number;
}

export default function StatsCard({
    readiness,
    streak,
}: StatsCardProps) {
    return (
        <section className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white p-5 border border-[var(--border)]">

                <p className="text-sm text-[var(--text-secondary)]">
                    Career Readiness
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    {readiness}%
                </h2>

            </div>

            <div className="rounded-2xl bg-white p-5 border border-[var(--border)]">

                <p className="text-sm text-[var(--text-secondary)]">
                    Current Streak
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    🔥 {streak}
                </h2>

            </div>

        </section>
    );
}