interface GoalCardProps {
    icon: string;
    title: string;
    description: string;
    selected: boolean;
    onClick: () => void;
}

export default function GoalCard({
    icon,
    title,
    description,
    selected,
    onClick,
}: GoalCardProps) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full rounded-3xl border p-5 text-left transition-all duration-300
        ${selected
                    ? "border-[var(--primary)] bg-[#EEF4EF] shadow-md"
                    : "border-[var(--border)] bg-white hover:border-[var(--primary)] hover:shadow-sm"
                }
      `}
        >
            <div className="mb-4 text-3xl">{icon}</div>

            <h3 className="text-xl font-semibold text-[var(--text)]">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {description}
            </p>

            {selected && (
                <p className="mt-5 font-medium text-[var(--primary)]">
                    ✓ Selected
                </p>
            )}
        </button>
    );
}