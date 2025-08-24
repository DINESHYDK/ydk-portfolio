import React from "react";
import { Award, Trophy, Target, Star, Zap } from "lucide-react";
import PlatformCard from "./PlatformCard";
import StatCard from "./StatCard";
import type { StatsData } from "./types";

const sampleData: StatsData = {
  total: {
    questionsSolved: 2050,
    contests: 45,
    combinedRating: 4500,
  },
  codeforces: {
    rating: 2400,
    maxRating: 2500,
    rank: "Master",
    maxRank: "Grandmaster",
  },
  leetcode: {
    totalSolved: 1250,
    easy: 450,
    medium: 650,
    hard: 150,
    contestRating: 1825,
  },
  codechef: {
    rating: 2100,
    stars: "5★",
  },
  gfg: {
    totalSolved: 800,
    score: 750,
  },
};

export interface CodingStatsDashboardProps {
  data?: StatsData;
}

export const CodingStatsDashboard: React.FC<CodingStatsDashboardProps> = ({
  data = sampleData,
}) => {
  const d = data;

  return (
    <div
      className="grid gap-4 md:gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
    >
      {/* Total Achievements - spans 2 cols on md+ */}
      <div className="md:col-span-2">
        <section className="rounded-2xl border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm p-5 md:p-6 h-full">
          <header className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-white">
              Total Achievements
            </h3>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Questions Solved"
              value={d.total.questionsSolved.toLocaleString()}
            />
            <StatCard
              label="Contests Participated"
              value={d.total.contests.toLocaleString()}
            />
            <StatCard
              label="Combined Rating"
              value={
                <span className="text-primary">
                  {d.total.combinedRating.toLocaleString()}
                </span>
              }
            />
          </div>
        </section>
      </div>

      {/* Codeforces */}
      <PlatformCard
        title="Codeforces"
        icon={<Trophy className="h-5 w-5 text-primary" />}
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
        className="md:col-span-2"
      >
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            label="Total"
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
            className="col-span-3 sm:col-span-1"
          />
          <StatCard
            label="Contest Rating"
            value={d.leetcode.contestRating?.toLocaleString() ?? "—"}
            className="col-span-3 sm:col-span-2"
          />
        </div>
      </PlatformCard>

      {/* CodeChef */}
      <PlatformCard
        title="CodeChef"
        icon={<Star className="h-5 w-5 text-primary" />}
      >
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Rating" value={d.codechef.rating.toLocaleString()} />
          <StatCard
            label="Stars"
            value={<span className="text-primary">{d.codechef.stars}</span>}
          />
        </div>
      </PlatformCard>

      {/* GeeksforGeeks */}
      <PlatformCard
        title="GeeksforGeeks"
        icon={<Zap className="h-5 w-5 text-primary" />}
        className="md:col-span-2"
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
