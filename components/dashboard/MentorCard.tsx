"use client";

import { useRouter } from "next/navigation";

export default function MentorCard() {
    const router = useRouter();

    function handleAskMentor() {
        router.push("/mentor");
    }

    return (
        <section className="rounded-3xl border border-[var(--accent)] bg-[var(--accent)]/20 p-6">
            <h2 className="text-xl font-semibold">
                AI Mentor
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Ask questions, revise concepts, or get a personalized study plan.
            </p>

            <button
                onClick={handleAskMentor}
                className="mt-5 rounded-xl bg-[var(--primary)] px-5 py-3 text-white transition hover:bg-[var(--primary-dark)]"
            >
                Ask Mentor
            </button>
        </section>
    );
}