interface TimelineItemProps {
    title: string;
    duration: string;
    completed: boolean;
    isLast?: boolean;
}

export default function TimelineItem({
    title,
    duration,
    completed,
    isLast = false,
}: TimelineItemProps) {
    return (
        <div className="flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${completed
                            ? "bg-[var(--primary)] text-white"
                            : "border border-[var(--border)] bg-white"
                        }`}
                >
                    {completed ? "✓" : ""}
                </div>

                {!isLast && (
                    <div className="mt-2 h-12 w-px bg-[var(--border)]" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <h3
                    className={`font-semibold ${completed
                            ? "text-[var(--primary)]"
                            : "text-[var(--text)]"
                        }`}
                >
                    {title}
                </h3>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {duration}
                </p>
            </div>
        </div>
    );
}