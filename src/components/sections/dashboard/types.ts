export interface TotalStats {
  questionsSolved: number;
  contests: number;
}

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  profileUrl: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  contestRating: number;
  maxRating?: number;
  profileUrl: string;
}

export interface CodeChefStats {
  rating: number;
  maxRating: number;
  stars: string; // e.g., "5★"
  problemsSolved: number;
  globalRank: number;
  profileUrl: string;
}

export interface GfgStats {
  totalSolved: number;
  score?: number;
  profileUrl: string;
}

export interface StatsData {
  total: TotalStats;
  codeforces: CodeforcesStats;
  leetcode: LeetCodeStats;
  codechef: CodeChefStats;
  gfg: GfgStats;
  lastUpdated?: string;
}
