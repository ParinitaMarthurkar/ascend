"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    Map,
    Trophy,
    Bot,
    User,
} from "lucide-react";

const items = [
    {
        label: "Home",
        href: "/dashboard",
        icon: House,
    },
    {
        label: "Journey",
        href: "/roadmap",
        icon: Map,
    },
    {
        label: "Challenges",
        href: "/challenges",
        icon: Trophy,
    },
    {
        label: "Mentor",
        href: "/mentor",
        icon: Bot,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-white/90 backdrop-blur-lg">
            <div
                className="mx-auto flex h-16 max-w-md items-center justify-around"
                style={{ margin: "0 auto" }}
            >
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 text-xs transition ${active
                                    ? "text-[var(--primary)]"
                                    : "text-[var(--text-secondary)]"
                                }`}
                        >
                            <Icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}