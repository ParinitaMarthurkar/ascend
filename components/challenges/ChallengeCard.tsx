interface ChallengeCardProps {
    title: string;
    description: string;
    xp: number;
    completed: boolean;
}

export default function ChallengeCard({
    title,
    description,
    xp,
    completed,
}: ChallengeCardProps) {
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

            <div className="mt-5">
                {completed ? (
                    <span className="font-medium text-green-600">
                        ✅ Completed
                    </span>
                ) : (
                    <button className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white transition hover:opacity-90">
                        Start Challenge
                    </button>
                )}
            </div>
        </div>
    );
}