"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

const steps = [
    "Understanding your destination...",
    "Matching industry trends...",
    "Building your personalized roadmap...",
];

export default function AnalysisPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 1200);

            return () => clearTimeout(timer);
        }

        const redirect = setTimeout(() => {
            router.push("/roadmap");
        }, 1500);

        return () => clearTimeout(redirect);
    }, [currentStep, router]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
            <div className="max-w-sm text-center">
                <div className="mb-8 flex justify-center">
                    <Logo />
                </div>

                <h1 className="text-3xl font-bold">
                    Ascend AI
                </h1>

                <p className="mt-3 text-[var(--text-secondary)]">
                    Creating your personalized roadmap...
                </p>

                <div className="mt-10 space-y-4 text-left">
                    {steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-3">
                            <span className="text-xl">
                                {index < currentStep ? "✅" : "⏳"}
                            </span>

                            <span>{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}