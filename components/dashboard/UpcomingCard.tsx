export default function UpcomingCard() {
    return (
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-secondary)]">
                Up Next
            </p>

            <h2 className="mt-2 text-xl font-semibold">
                Data Structures
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Unlocks after completing Git & GitHub.
            </p>
        </section>
    );
}