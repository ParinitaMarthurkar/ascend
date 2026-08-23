import Button from "@/components/ui/Button";

interface MissionCardProps {
    title: string;
    duration: string;
    onContinue?: () => void;
}

export default function MissionCard({
    title,
    duration,
    onContinue,
}: MissionCardProps) {
    return (
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-secondary)]">
                Today's Mission
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
                {title}
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Estimated time: {duration}
            </p>

            <Button
                fullWidth
                className="mt-5"
                onClick={onContinue}
            >
                Continue Learning
            </Button>
        </section>
    );
}