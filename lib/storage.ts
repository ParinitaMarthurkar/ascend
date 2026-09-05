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
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getYesterday(): string {
    const date = new Date();

    date.setDate(date.getDate() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function recordLearningDay() {
    const progress = loadUserProgress();

    const today = getToday();

    // Don't count multiple learning sessions on the same day.
    if (progress.lastLearningDate === today) {
        return progress;
    }

    const yesterday = getYesterday();

    let newStreak = 1;

    if (progress.lastLearningDate === yesterday) {
        newStreak = progress.streak + 1;
    }

    const updatedProgress = {
        ...progress,
        streak: newStreak,
        lastLearningDate: today,
    };

    saveUserProgress(updatedProgress);

    // Sync the 7-day challenge.
    const challenges = loadChallengeProgress();

    const streakChallenge = challenges[3];

    const updatedChallenges = {
        ...challenges,
        3: {
            started: true,
            completed: newStreak >= 7,
            progress: Math.min(newStreak, 7),
            startedAt:
                streakChallenge?.startedAt ??
                new Date().toISOString(),
            elapsedSeconds:
                streakChallenge?.elapsedSeconds ?? 0,
            lastActiveDate: today,
        },
    };

    saveChallengeProgress(updatedChallenges);

    return updatedProgress;
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

    // Mark "Complete Today's Mission" as completed.
    const challenges = loadChallengeProgress();

    const updatedChallenges = {
        ...challenges,
        1: {
            started: true,
            completed: true,
            progress: 1,
            startedAt:
                challenges[1]?.startedAt ??
                new Date().toISOString(),
            elapsedSeconds:
                challenges[1]?.elapsedSeconds ?? 0,
            lastActiveDate:
                new Date().toISOString().split("T")[0],
        },
    };

    saveChallengeProgress(updatedChallenges);

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