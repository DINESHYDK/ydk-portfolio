import React from "react";
import { Award, Trophy, Target, Star, Zap } from "lucide-react";
import PlatformCard from "./PlatformCard";
import StatCard from "./StatCard";
import type { StatsData } from "./types";

// Function to calculate total stats from individual platform data
const calculateTotalStats = (platformData: Omit<StatsData, "total">) => {
  const totalQuestionsSolved =
    (platformData.leetcode?.totalSolved || 0) +
    (platformData.codechef?.problemsSolved || 0) +
    (platformData.gfg?.totalSolved || 0);
  // Note: Codeforces doesn't have a direct "problems solved" count in the current structure

  // For contests, you can manually add this or estimate based on your participation
  // This is a placeholder - you should update this with your actual contest count
  const totalContests = 12; // Update this with your actual total contests participated

  return {
    questionsSolved: totalQuestionsSolved,
    contests: totalContests,
  };
};

// Platform data without totals (totals will be calculated automatically)
const platformData = {
  codeforces: {
    rating: 820,
    maxRating: 820,
    rank: "Pupil",
    maxRank: "Pupil",
    profileUrl: "https://codeforces.com/profile/dineshydk",
  },
  leetcode: {
    totalSolved: 34,
    easy: 23,
    medium: 10,
    hard: 1,
    contestRating: 820,
    maxRating: 820,
    profileUrl: "https://leetcode.com/dineshydk/",
  },
  codechef: {
    rating: 1720,
    maxRating: 1720,
    stars: "2★",
    problemsSolved: 1045,
    globalRank: 67208,
    profileUrl: "https://www.codechef.com/users/dineshydk",
  },
  gfg: {
    totalSolved: 39,
    score: 390,
    profileUrl: "https://auth.geeksforgeeks.org/user/dineshydk/practice",
  },
};

// Complete data with auto-calculated totals
const sampleData: StatsData = {
  total: calculateTotalStats(platformData),
  ...platformData,
};

export interface CodingStatsDashboardProps {
  data?: StatsData;
}

export const CodingStatsDashboard: React.FC<CodingStatsDashboardProps> = ({
  data = sampleData,
}) => {
  const d = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Total Achievements (Takes 1 of 3 columns) */}
      <section className="md:col-span-1 rounded-2xl border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm p-5 md:p-6 h-full">
        <header className="flex items-center gap-3 mb-2 md:mb-4">
          <Award className="h-6 w-6 text-primary" />
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Total Achievements
          </h3>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Questions Solved"
            value={d.total.questionsSolved.toLocaleString()}
          />
          <StatCard
            label="Contests Participated"
            value={d.total.contests.toLocaleString()}
          />
        </div>
      </section>

      {/* CodeChef (Takes 2 of 3 columns) */}
      <PlatformCard
        title="CodeChef"
        icon={<Star className="h-5 w-5 text-primary" />}
        href={d.codechef.profileUrl}
        className="md:col-span-2"
      >
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Rating" value={d.codechef.rating.toLocaleString()} />
          <StatCard
            label="Max Rating"
            value={d.codechef.maxRating.toLocaleString()}
          />
          <StatCard
            label="Problems Solved"
            value={d.codechef.problemsSolved.toLocaleString()}
          />
          <StatCard
            label="Global Rank"
            value={d.codechef.globalRank.toLocaleString()}
          />
        </div>
      </PlatformCard>

      {/* Codeforces (will automatically start on the next row) */}
      <PlatformCard
        title="Codeforces"
        icon={<Trophy className="h-5 w-5 text-primary" />}
        href={d.codeforces.profileUrl}
        className="h-full"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Rating</span>
            <span className="font-semibold text-white">
              {d.codeforces.rating.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Max Rating</span>
            <span className="font-semibold text-white">
              {d.codeforces.maxRating.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Rank</span>
            <span className="font-semibold text-primary">
              {d.codeforces.rank}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Max Rank</span>
            <span className="font-semibold text-primary">
              {d.codeforces.maxRank}
            </span>
          </div>
        </div>
      </PlatformCard>

      {/* LeetCode */}
      <PlatformCard
        title="LeetCode"
        icon={<Target className="h-5 w-5 text-primary" />}
        href={d.leetcode.profileUrl}
        className="h-full"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Total Solved"
            value={d.leetcode.totalSolved.toLocaleString()}
          />
          <StatCard
            label="Easy"
            value={<span className="text-emerald-400">{d.leetcode.easy}</span>}
          />
          <StatCard
            label="Medium"
            value={<span className="text-yellow-400">{d.leetcode.medium}</span>}
          />
          <StatCard
            label="Hard"
            value={<span className="text-red-400">{d.leetcode.hard}</span>}
          />
          <StatCard
            label="Contest Rating"
            value={d.leetcode.contestRating?.toLocaleString() ?? "—"}
          />
          {d.leetcode.maxRating && (
            <StatCard
              label="Max Rating"
              value={d.leetcode.maxRating.toLocaleString()}
            />
          )}
        </div>
      </PlatformCard>

      {/* GeeksforGeeks */}
      <PlatformCard
        title="GeeksforGeeks"
        icon={<Zap className="h-5 w-5 text-primary" />}
        href={d.gfg.profileUrl}
        className="h-full"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="Problems Solved"
            value={d.gfg.totalSolved.toLocaleString()}
          />
          <StatCard
            label="Coding Score"
            value={d.gfg.score?.toLocaleString() ?? "—"}
          />
        </div>
      </PlatformCard>
    </div>
  );
};

export default CodingStatsDashboard;
