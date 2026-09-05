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

    {
        stageId: 4,
        title: "NumPy",
        description:
            "Learn NumPy, the fundamental Python library for numerical computing and machine learning.",
        topics: [
            "NumPy arrays",
            "Array creation and indexing",
            "Array operations",
            "Broadcasting",
            "Mathematical and statistical operations",
        ],
    },

    {
        stageId: 5,
        title: "Pandas",
        description:
            "Learn Pandas for working with structured data, analyzing datasets, and preparing data for machine learning.",
        topics: [
            "Series and DataFrames",
            "Loading and inspecting datasets",
            "Selecting and filtering data",
            "Handling missing values",
            "Grouping and aggregating data",
        ],
    },

    {
        stageId: 6,
        title: "Machine Learning",
        description:
            "Learn the foundations of machine learning and understand how models learn patterns from data.",
        topics: [
            "Supervised and unsupervised learning",
            "Training and testing datasets",
            "Regression and classification",
            "Clustering",
            "Model evaluation and performance metrics",
        ],
    },

    {
        stageId: 7,
        title: "Deep Learning",
        description:
            "Understand neural networks and learn how deep learning models are trained to solve complex problems.",
        topics: [
            "Neurons and neural networks",
            "Activation functions",
            "Forward and backward propagation",
            "Loss functions and optimization",
            "Convolutional and recurrent neural networks",
        ],
    },

    {
        stageId: 8,
        title: "MLOps",
        description:
            "Learn how machine learning models are developed, deployed, monitored, and maintained in production.",
        topics: [
            "ML project structure",
            "Model versioning",
            "Experiment tracking",
            "Model deployment",
            "Monitoring and retraining",
        ],
    },

    {
        stageId: 9,
        title: "LLMs & RAG",
        description:
            "Learn how modern large language models work and how retrieval-augmented generation connects them to external knowledge.",
        topics: [
            "Large language model fundamentals",
            "Tokens and embeddings",
            "Prompt engineering",
            "Vector databases",
            "Retrieval-augmented generation",
        ],
    },

    {
        stageId: 10,
        title: "Deploy AI Applications",
        description:
            "Learn how to turn AI models and applications into reliable products that users can access.",
        topics: [
            "Building AI-powered applications",
            "APIs and model integration",
            "Authentication and security",
            "Deployment and hosting",
            "Monitoring AI applications",
        ],
    },
];