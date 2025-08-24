export interface TotalStats {
  questionsSolved: number;
  contests: number;
  combinedRating: number;
}

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  contestRating?: number;
}

export interface CodeChefStats {
  rating: number;
  stars: string; // e.g., "5★"
}

export interface GfgStats {
  totalSolved: number;
  score?: number;
}

export interface StatsData {
  total: TotalStats;
  codeforces: CodeforcesStats;
  leetcode: LeetCodeStats;
  codechef: CodeChefStats;
  gfg: GfgStats;
  lastUpdated?: string;
}
