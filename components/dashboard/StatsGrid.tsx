export default function StatsGrid() {
    return (
        <section className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white border border-[var(--border)] p-5">
                <p className="text-sm text-[var(--text-secondary)]">
                    Readiness
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    18%
                </h2>
            </div>

            <div className="rounded-2xl bg-white border border-[var(--border)] p-5">
                <p className="text-sm text-[var(--text-secondary)]">
                    Streak
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    🔥 5
                </h2>
            </div>

        </section>
    );
}