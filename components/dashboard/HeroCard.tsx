interface HeroCardProps {
    goal: string;
}

export default function HeroCard({ goal }: HeroCardProps) {
    return (
        <section className="rounded-3xl bg-[var(--primary)] p-8 text-white">
            <p className="text-sm opacity-80">
                Welcome back 👋
            </p>

            <h1 className="mt-3 text-4xl font-bold">
                Become a
                <br />
                {goal}
            </h1>

            <p className="mt-5 text-sm opacity-90">
                Small progress every day compounds into extraordinary results.
            </p>
        </section>
    );
}