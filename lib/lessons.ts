export interface Lesson {
    stageId: number;
    title: string;
    description: string;
    topics: string[];
}

export const lessons: Lesson[] = [
    {
        stageId: 1,
        title: "Python Fundamentals",
        description:
            "Learn the core concepts of Python and build a strong programming foundation.",
        topics: [
            "Variables and data types",
            "Conditional statements",
            "Loops",
            "Functions",
            "Lists, tuples and dictionaries",
        ],
    },
    {
        stageId: 2,
        title: "Git & GitHub",
        description:
            "Learn how developers track, manage and collaborate on code using Git and GitHub.",
        topics: [
            "What Git is and why it matters",
            "Repositories and commits",
            "Branches and merging",
            "Working with GitHub",
            "Pull requests and collaboration",
        ],
    },
    {
        stageId: 3,
        title: "Data Structures & Algorithms",
        description:
            "Build your problem-solving foundation by learning common data structures and algorithms.",
        topics: [
            "Arrays and strings",
            "Stacks and queues",
            "Linked lists",
            "Trees and graphs",
            "Searching and sorting",
        ],
    },
];