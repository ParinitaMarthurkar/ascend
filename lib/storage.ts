export interface UserProgress {
    selectedGoal: string;
    completedStages: number[];
    readiness: number;
    streak: number;
    todayMission: number;
    lastLearningDate: string | null;
}

const defaultProgress: UserProgress = {
    selectedGoal: "aiEngineer",
    completedStages: [1],
    readiness: 18,
    streak: 0,
    todayMission: 2,
    lastLearningDate: null,
};

export function saveUserProgress(progress: UserProgress) {
    if (typeof window === "undefined") return;

    localStorage.setItem(
        "userProgress",
        JSON.stringify(progress)
    );
}

export function loadUserProgress(): UserProgress {
    if (typeof window === "undefined") {
        return defaultProgress;
    }

    const stored = localStorage.getItem("userProgress");

    if (!stored) return defaultProgress;

    try {
        const parsed = JSON.parse(stored);

        return {
            ...defaultProgress,
            ...parsed,
        };
    } catch {
        return defaultProgress;
    }
}

function getToday(): string {
    return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return date.toISOString().split("T")[0];
}

export function recordLearningDay() {
    const progress = loadUserProgress();

    const today = getToday();

    // Already recorded today
    if (progress.lastLearningDate === today) {
        return progress;
    }

    const yesterday = getYesterday();

    let newStreak = 1;

    if (progress.lastLearningDate === yesterday) {
        newStreak = progress.streak + 1;
    }

    const updated = {
        ...progress,
        streak: newStreak,
        lastLearningDate: today,
    };

    saveUserProgress(updated);

    return updated;
}

export function completeStage(stageId: number) {
    const progress = loadUserProgress();

    if (progress.completedStages.includes(stageId)) {
        return progress;
    }

    const updated = {
        ...progress,
        completedStages: [
            ...progress.completedStages,
            stageId,
        ],
        readiness: Math.min(
            progress.readiness + 8,
            100
        ),
        todayMission: stageId + 1,
    };

    saveUserProgress(updated);

    return recordLearningDay();
}

// Compatibility API
export function saveProgress(
    key: keyof UserProgress,
    value: UserProgress[keyof UserProgress]
) {
    const progress = loadUserProgress();

    saveUserProgress({
        ...progress,
        [key]: value,
    });
}

export function loadProgress<T>(
    key: keyof UserProgress,
    defaultValue: T
): T {
    const progress = loadUserProgress();

    return (progress[key] as T) ?? defaultValue;
}

export interface ChallengeProgress {
    started: boolean;
    completed: boolean;
    progress: number;
    startedAt: string | null;
    elapsedSeconds: number;
    lastActiveDate: string | null;
}

export type ChallengeProgressMap =
    Record<number, ChallengeProgress>;

const defaultChallengeProgress: ChallengeProgressMap = {};

export function loadChallengeProgress(): ChallengeProgressMap {
    if (typeof window === "undefined") {
        return defaultChallengeProgress;
    }

    const stored =
        localStorage.getItem("challengeProgress");

    if (!stored) {
        return defaultChallengeProgress;
    }

    try {
        return JSON.parse(stored) as ChallengeProgressMap;
    } catch {
        return defaultChallengeProgress;
    }
}

export function saveChallengeProgress(
    progress: ChallengeProgressMap
) {
    if (typeof window === "undefined") return;

    localStorage.setItem(
        "challengeProgress",
        JSON.stringify(progress)
    );
}