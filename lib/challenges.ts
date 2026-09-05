export interface Challenge {
    id: number;
    title: string;
    description: string;
    xp: number;
    type: "mission" | "timer" | "streak";
    target: number;
}

export const challenges: Challenge[] = [
    {
        id: 1,
        title: "Complete Today's Mission",
        description: "Finish the lesson assigned for today.",
        xp: 100,
        type: "mission",
        target: 1,
    },
    {
        id: 2,
        title: "Study for 30 Minutes",
        description: "Spend at least 30 minutes learning.",
        xp: 75,
        type: "timer",
        target: 30,
    },
    {
        id: 3,
        title: "Maintain a 7-Day Streak",
        description: "Keep learning every day.",
        xp: 300,
        type: "streak",
        target: 7,
    },
    {
        id: 4,
        title: "Complete Python Fundamentals",
        description: "Finish the first roadmap milestone.",
        xp: 500,
        type: "mission",
        target: 1,
    },
];