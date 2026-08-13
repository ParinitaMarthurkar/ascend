export interface Challenge {
    id: number;
    title: string;
    description: string;
    xp: number;
    completed: boolean;
}

export const challenges: Challenge[] = [
    {
        id: 1,
        title: "Complete Today's Mission",
        description: "Finish the lesson assigned for today.",
        xp: 100,
        completed: false,
    },
    {
        id: 2,
        title: "Study for 30 Minutes",
        description: "Spend at least 30 minutes learning.",
        xp: 75,
        completed: false,
    },
    {
        id: 3,
        title: "Maintain a 7-Day Streak",
        description: "Keep learning every day.",
        xp: 300,
        completed: false,
    },
    {
        id: 4,
        title: "Complete Python Fundamentals",
        description: "Finish the first roadmap milestone.",
        xp: 500,
        completed: true,
    },
];