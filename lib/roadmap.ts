export interface RoadmapStage {
    id: number;
    title: string;
    duration: string;
}

export interface CareerRoadmap {
    title: string;
    timeline: string;
    stages: RoadmapStage[];
}

export const roadmap: Record<string, CareerRoadmap> = {
    aiEngineer: {
        title: "AI Engineer",
        timeline: "12 Months",
        stages: [
            { id: 1, title: "Python Fundamentals", duration: "1 Week" },
            { id: 2, title: "Git & GitHub", duration: "3 Days" },
            { id: 3, title: "Data Structures & Algorithms", duration: "2 Weeks" },
            { id: 4, title: "NumPy", duration: "1 Week" },
            { id: 5, title: "Pandas", duration: "1 Week" },
            { id: 6, title: "Machine Learning", duration: "3 Weeks" },
            { id: 7, title: "Deep Learning", duration: "4 Weeks" },
            { id: 8, title: "MLOps", duration: "2 Weeks" },
            { id: 9, title: "LLMs & RAG", duration: "3 Weeks" },
            { id: 10, title: "Deploy AI Applications", duration: "2 Weeks" },
        ],
    },

    softwareEngineer: {
        title: "Software Engineer",
        timeline: "10 Months",
        stages: [
            { id: 1, title: "Programming Fundamentals", duration: "1 Week" },
            { id: 2, title: "Git & GitHub", duration: "3 Days" },
            { id: 3, title: "Object-Oriented Programming", duration: "2 Weeks" },
            { id: 4, title: "Data Structures & Algorithms", duration: "4 Weeks" },
            { id: 5, title: "Operating Systems", duration: "2 Weeks" },
            { id: 6, title: "DBMS", duration: "2 Weeks" },
            { id: 7, title: "Computer Networks", duration: "2 Weeks" },
            { id: 8, title: "Backend Development", duration: "4 Weeks" },
            { id: 9, title: "System Design", duration: "4 Weeks" },
            { id: 10, title: "Deployment", duration: "2 Weeks" },
        ],
    },

    dataScientist: {
        title: "Data Scientist",
        timeline: "11 Months",
        stages: [
            { id: 1, title: "Python", duration: "1 Week" },
            { id: 2, title: "Statistics", duration: "2 Weeks" },
            { id: 3, title: "NumPy", duration: "1 Week" },
            { id: 4, title: "Pandas", duration: "1 Week" },
            { id: 5, title: "SQL", duration: "2 Weeks" },
            { id: 6, title: "Data Visualization", duration: "2 Weeks" },
            { id: 7, title: "Machine Learning", duration: "4 Weeks" },
            { id: 8, title: "Deep Learning", duration: "3 Weeks" },
            { id: 9, title: "Projects", duration: "3 Weeks" },
            { id: 10, title: "Portfolio", duration: "2 Weeks" },
        ],
    },

    cloudEngineer: {
        title: "Cloud Engineer",
        timeline: "10 Months",
        stages: [
            { id: 1, title: "Linux", duration: "2 Weeks" },
            { id: 2, title: "Networking Basics", duration: "2 Weeks" },
            { id: 3, title: "AWS Fundamentals", duration: "3 Weeks" },
            { id: 4, title: "Docker", duration: "2 Weeks" },
            { id: 5, title: "Kubernetes", duration: "4 Weeks" },
            { id: 6, title: "Terraform", duration: "3 Weeks" },
            { id: 7, title: "CI/CD", duration: "2 Weeks" },
            { id: 8, title: "Monitoring", duration: "2 Weeks" },
        ],
    },

    cybersecurityEngineer: {
        title: "Cybersecurity Engineer",
        timeline: "12 Months",
        stages: [
            { id: 1, title: "Networking", duration: "2 Weeks" },
            { id: 2, title: "Linux", duration: "2 Weeks" },
            { id: 3, title: "Python", duration: "2 Weeks" },
            { id: 4, title: "Ethical Hacking", duration: "4 Weeks" },
            { id: 5, title: "Web Security", duration: "3 Weeks" },
            { id: 6, title: "Penetration Testing", duration: "4 Weeks" },
            { id: 7, title: "SOC & SIEM", duration: "3 Weeks" },
            { id: 8, title: "Security Projects", duration: "3 Weeks" },
        ],
    },

    uiuxDesigner: {
        title: "UI/UX Designer",
        timeline: "8 Months",
        stages: [
            { id: 1, title: "Design Principles", duration: "1 Week" },
            { id: 2, title: "Typography", duration: "1 Week" },
            { id: 3, title: "Color Theory", duration: "1 Week" },
            { id: 4, title: "Figma", duration: "3 Weeks" },
            { id: 5, title: "Wireframing", duration: "2 Weeks" },
            { id: 6, title: "Prototyping", duration: "2 Weeks" },
            { id: 7, title: "User Research", duration: "2 Weeks" },
            { id: 8, title: "Portfolio", duration: "3 Weeks" },
        ],
    },
};