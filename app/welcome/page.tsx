import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center text-center">
                    <Logo />

                    <h1 className="mt-10 text-5xl font-bold leading-tight text-[var(--text)]">
                        Build the career
                        <br />
                        you've imagined.
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                        Personalized AI roadmaps.
                        <br />
                        Daily career quests.
                        <br />
                        One mentor for your entire journey.
                    </p>
                </div>

                <div className="mt-16 space-y-4">
                    <Link href="/goal">
                        <Button fullWidth>Create My Path</Button>
                    </Link>

                    <button className="w-full text-center text-[var(--text-secondary)]">
                        Already have an account? Sign In
                    </button>
                </div>
            </div>
        </main>
    );
}