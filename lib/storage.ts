export interface UserProgress {
    selectedGoal: string;
    completedStages: number[];
    readiness: number;
    streak: number;
    todayMission: number;
}

const defaultProgress: UserProgress = {
    selectedGoal: "aiEngineer",
    completedStages: [1],
    readiness: 18,
    streak: 5,
    todayMission: 2,
};

// New API
export function saveUserProgress(progress: UserProgress) {
    if (typeof window === "undefined") return;

    localStorage.setItem("userProgress", JSON.stringify(progress));
}

export function loadUserProgress(): UserProgress {
    if (typeof window === "undefined") {
        return defaultProgress;
    }

    const stored = localStorage.getItem("userProgress");

    if (!stored) return defaultProgress;

    try {
        return JSON.parse(stored) as UserProgress;
    } catch {
        return defaultProgress;
    }
}

// Compatibility API
export function saveProgress(key: keyof UserProgress, value: UserProgress[keyof UserProgress]) {
    const progress = loadUserProgress();

    saveUserProgress({
        ...progress,
        [key]: value,
    });
}

export function completeCurrentStage() {
    const progress = loadUserProgress();

    const nextStage =
        Math.max(...progress.completedStages) + 1;

    const updated = {
        ...progress,
        completedStages: [
            ...progress.completedStages,
            nextStage,
        ],
        readiness: Math.min(progress.readiness + 8, 100),
        todayMission: nextStage + 1,
    };

    saveUserProgress(updated);

    return updated;
}

export function loadProgress<T>(key: keyof UserProgress, defaultValue: T): T {
    const progress = loadUserProgress();

    return (progress[key] as T) ?? defaultValue;
}