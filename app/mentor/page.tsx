"use client";

import { useState } from "react";
import BottomNav from "@/components/navigation/BottomNav";

const sampleReplies: Record<string, string> = {
    "what should i learn next":
        "Based on your roadmap, your next step is Git & GitHub. Finish it before moving to Data Structures.",
    "explain python":
        "Python is a beginner-friendly programming language used for AI, automation, web development and data science.",
    "how do i prepare for interviews":
        "Focus on DSA, build 2–3 quality projects, practice aptitude, and revise CS fundamentals.",
    default:
        "I'm your AI Mentor. Ask me anything about learning, careers, interviews or your roadmap.",
};

export default function MentorPage() {
    const [messages, setMessages] = useState([
        {
            sender: "mentor",
            text: "Hi 👋 I'm your AI Mentor. What would you like to learn today?",
        },
    ]);

    const [input, setInput] = useState("");

    function sendMessage() {
        if (!input.trim()) return;

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: input },
            {
                sender: "mentor",
                text:
                    sampleReplies[input.toLowerCase()] ??
                    sampleReplies.default,
            },
        ]);

        setInput("");
    }

    return (
        <main className="flex h-screen bg-[var(--background)]">
            <div className="mx-auto flex h-screen w-full max-w-md flex-col">

                {/* Header */}
                <header className="border-b border-[var(--border)] bg-white p-6">
                    <h1 className="text-3xl font-bold">🤖 AI Mentor</h1>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Always available to guide your career journey.
                    </p>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-sm ${message.sender === "user"
                                ? "ml-auto bg-[var(--primary)] text-white"
                                : "border border-[var(--border)] bg-white"
                                }`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="border-t border-[var(--border)] bg-white p-4">

                    <div className="mb-3 flex flex-wrap gap-2">
                        <button
                            onClick={() => setInput("What should I learn next")}
                            className="rounded-full border px-3 py-2 text-sm"
                        >
                            Learning Plan
                        </button>

                        <button
                            onClick={() => setInput("Explain Python")}
                            className="rounded-full border px-3 py-2 text-sm"
                        >
                            Explain Python
                        </button>

                        <button
                            onClick={() =>
                                setInput("How do I prepare for interviews")
                            }
                            className="rounded-full border px-3 py-2 text-sm"
                        >
                            Interview Tips
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <input
                            className="flex-1 rounded-xl border px-4 py-3 outline-none"
                            placeholder="Ask your mentor..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                        />

                        <button
                            onClick={sendMessage}
                            className="rounded-xl bg-[var(--primary)] px-6 text-white"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            <BottomNav />
        </main>
    );
}