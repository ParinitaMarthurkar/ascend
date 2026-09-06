export interface UserProgress {
    selectedGoal: string;
    completedStages: number[];
    readiness: number;
    streak: number;
    todayMission: number;
    lastLearningDate: string | null;
    xp: number;
}

const defaultProgress: UserProgress = {
    selectedGoal: "aiEngineer",
    completedStages: [1],
    readiness: 18,
    streak: 0,
    todayMission: 2,
    lastLearningDate: null,
    xp: 0,
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

export function addXP(amount: number) {
    const progress = loadUserProgress();

    const updated = {
        ...progress,
        xp: progress.xp + amount,
    };

    saveUserProgress(updated);

    return updated;
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

    // Sync the 7-day streak challenge.
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
            xpAwarded:
                streakChallenge?.xpAwarded ?? false,
        },
    };

    saveChallengeProgress(updatedChallenges);

    // Award 7-day streak XP only once.
    if (newStreak >= 7) {
        completeChallenge(3, 300);
    }

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

    // Complete "Today's Mission" and award 100 XP once.
    completeChallenge(1, 100);

    // Record today's learning activity.
    return recordLearningDay();
}

export function completeChallenge(
    challengeId: number,
    xp: number
) {
    const challenges = loadChallengeProgress();

    const challenge = challenges[challengeId];

    // XP has already been awarded for this challenge.
    if (challenge?.xpAwarded) {
        return false;
    }

    const updatedChallenges = {
        ...challenges,
        [challengeId]: {
            ...(challenge ?? {
                started: true,
                completed: false,
                progress: 0,
                startedAt: null,
                elapsedSeconds: 0,
                lastActiveDate: null,
                xpAwarded: false,
            }),
            started: true,
            completed: true,
            xpAwarded: true,
        },
    };

    saveChallengeProgress(updatedChallenges);

    addXP(xp);

    return true;
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
    xpAwarded?: boolean;
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