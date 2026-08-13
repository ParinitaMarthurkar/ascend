import Button from "@/components/ui/Button";

export default function MissionCard() {
    return (
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-secondary)]">
                Today's Mission
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
                Git & GitHub
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
                Estimated time: 45 minutes
            </p>

            <Button fullWidth className="mt-5">
                Continue Learning
            </Button>
        </section>
    );
}