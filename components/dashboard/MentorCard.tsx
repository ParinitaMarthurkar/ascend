export default function MentorCard() {
    return (
        <section className="rounded-3xl bg-[var(--accent)]/20 p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-semibold">
                AI Mentor
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Ask questions, revise concepts, or get a personalized study plan.
            </p>

            <button className="mt-5 rounded-xl bg-[var(--primary)] px-5 py-3 text-white">
                Ask Mentor
            </button>
        </section>
    );
}