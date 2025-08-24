import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import SplitText from "../../../react_bits/SplitText/SplitText";
import {
  Trophy,
  Target,
  TrendingUp,
  Code2,
  Medal,
  Star,
  Award,
  Zap,
  ExternalLink,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CFUserInfo {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contribution?: number;
}

interface LCStats {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
}

interface CCStats {
  rating?: number;
  stars?: string;
}

interface GFGStats {
  totalSolved?: number;
}

export const CodingStats = () => {
  const [loading, setLoading] = useState({
    cf: false,
    lc: false,
    cc: false,
    gfg: false,
  });
  const [cfData, setCfData] = useState<CFUserInfo | null>(null);
  const [lcData, setLcData] = useState<LCStats | null>(null);
  const [ccData, setCcData] = useState<CCStats | null>(null);
  const [gfgData, setGfgData] = useState<GFGStats | null>(null);
  const [error, setError] = useState<{
    cf?: string;
    lc?: string;
    cc?: string;
    gfg?: string;
  }>({});

  // Sample data for demonstration - replace with actual API calls
  useEffect(() => {
    // Simulate loading states
    setLoading({ cf: true, lc: true, cc: true, gfg: true });

    // Simulate API responses after a delay
    setTimeout(() => {
      setCfData({
        handle: "tourist",
        rating: 2400,
        maxRating: 2500,
        rank: "Master",
        maxRank: "Grandmaster",
        contribution: 150,
      });
      setLcData({
        totalSolved: 1250,
        easySolved: 450,
        mediumSolved: 650,
        hardSolved: 150,
      });
      setCcData({
        rating: 2100,
        stars: "5★",
      });
      setGfgData({
        totalSolved: 800,
      });
      setLoading({ cf: false, lc: false, cc: false, gfg: false });
    }, 1500);
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 2400) return "text-red-500";
    if (rating >= 2100) return "text-orange-500";
    if (rating >= 1900) return "text-purple-500";
    if (rating >= 1600) return "text-blue-500";
    if (rating >= 1400) return "text-cyan-500";
    if (rating >= 1200) return "text-green-500";
    return "text-gray-500";
  };

  const getRankColor = (rank: string) => {
    const rankLower = rank.toLowerCase();
    if (rankLower.includes("grandmaster")) return "text-red-500";
    if (rankLower.includes("master")) return "text-orange-500";
    if (rankLower.includes("expert")) return "text-purple-500";
    if (rankLower.includes("specialist")) return "text-blue-500";
    if (rankLower.includes("pupil")) return "text-green-500";
    return "text-gray-500";
  };

  const getRankInfo = (rank: string) => {
    const rankLower = rank.toLowerCase();
    if (rankLower.includes("grandmaster")) return "Rating: 2400+";
    if (rankLower.includes("master")) return "Rating: 2100-2399";
    if (rankLower.includes("expert")) return "Rating: 1900-2099";
    if (rankLower.includes("specialist")) return "Rating: 1400-1899";
    if (rankLower.includes("pupil")) return "Rating: 1200-1399";
    return "Rating: Below 1200";
  };

  const getDifficultyPercentage = (solved: number, total: number) => {
    if (!total) return 0;
    return Math.round((solved / total) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const totalQuestions =
    (lcData?.totalSolved || 0) + (gfgData?.totalSolved || 0);
  const totalContests = 45; // Sample data

  // Platform URLs
  const platformUrls = {
    cf: "https://codeforces.com/profile/tourist",
    lc: "https://leetcode.com/tourist/",
    cc: "https://www.codechef.com/users/tourist",
    gfg: "https://auth.geeksforgeeks.org/user/tourist/",
  };

  const handleCardClick = (platform: keyof typeof platformUrls) => {
    window.open(platformUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <header className="mb-12 text-center">
          <SplitText
            text="Coding Stats"
            className="text-3xl md:text-4xl font-bold text-primary mb-3"
            splitType="chars"
            delay={50}
            duration={0.8}
            from={{
              opacity: 0,
              y: 50,
              rotationX: -90,
            }}
            to={{
              opacity: 1,
              y: 0,
              rotationX: 0,
            }}
          />
          <p className="text-muted-foreground mt-2">
            Competitive programming achievements across platforms
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <TooltipProvider>
          <motion.div
            className="grid gap-4 md:gap-6 auto-rows-[minmax(200px,1fr)]"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gridTemplateAreas: `
                "total total cf cf"
                "total total lc cc"
                "gfg gfg lc cc"
              `,
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Total Stats - Large Card */}
            <motion.div
              className="md:col-span-2 md:row-span-2"
              style={{ gridArea: "total" }}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="glass h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Award className="h-8 w-8 text-blue-500" />
                    Total Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="text-3xl font-bold text-blue-500 mb-2">
                        {totalQuestions.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Questions Solved
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-500 mb-2">
                        {totalContests}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Contests Participated
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="text-lg font-semibold text-primary mb-1">
                      Combined Rating
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {(
                        (cfData?.rating || 0) + (ccData?.rating || 0)
                      ).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Codeforces - Large Card */}
            <motion.div
              className="md:col-span-2"
              style={{ gridArea: "cf" }}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card
                className="glass h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCardClick("cf")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-500" />
                      Codeforces
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.cf ? (
                    <div className="flex items-center justify-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  ) : cfData ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Current Rating
                        </span>
                        <span
                          className={`font-bold text-lg ${getRatingColor(
                            cfData.rating || 0
                          )}`}
                        >
                          {cfData.rating?.toLocaleString() || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Max Rating
                        </span>
                        <span
                          className={`font-semibold ${getRatingColor(
                            cfData.maxRating || 0
                          )}`}
                        >
                          {cfData.maxRating?.toLocaleString() || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Current Rank
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={`font-semibold ${getRankColor(
                                cfData.rank || ""
                              )}`}
                            >
                              {cfData.rank || "—"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getRankInfo(cfData.rank || "")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Max Rank
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={`font-semibold ${getRankColor(
                                cfData.maxRank || ""
                              )}`}
                            >
                              {cfData.maxRank || "—"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getRankInfo(cfData.maxRank || "")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Code2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Data unavailable</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* LeetCode */}
            <motion.div
              style={{ gridArea: "lc" }}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card
                className="glass h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCardClick("lc")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-yellow-500" />
                      LeetCode
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.lc ? (
                    <div className="flex items-center justify-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    </div>
                  ) : lcData ? (
                    <div className="space-y-3">
                      <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-2xl font-bold text-yellow-500 mb-1">
                          {lcData.totalSolved?.toLocaleString() || "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total Solved
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="p-2 rounded bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                              <div className="text-sm font-semibold text-green-500">
                                {lcData.easySolved || "—"}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Easy
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getDifficultyPercentage(
                                lcData.easySolved || 0,
                                lcData.totalSolved || 0
                              )}
                              % of total solved
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                              <div className="text-sm font-semibold text-yellow-500">
                                {lcData.mediumSolved || "—"}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Medium
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getDifficultyPercentage(
                                lcData.mediumSolved || 0,
                                lcData.totalSolved || 0
                              )}
                              % of total solved
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="p-2 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                              <div className="text-sm font-semibold text-red-500">
                                {lcData.hardSolved || "—"}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Hard
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getDifficultyPercentage(
                                lcData.hardSolved || 0,
                                lcData.totalSolved || 0
                              )}
                              % of total solved
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Data unavailable</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* CodeChef */}
            <motion.div
              style={{ gridArea: "cc" }}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card
                className="glass h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCardClick("cc")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-green-500" />
                      CodeChef
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.cc ? (
                    <div className="flex items-center justify-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                  ) : ccData ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          {ccData.rating?.toLocaleString() || "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-lg font-semibold text-emerald-500 mb-1">
                          {ccData.stars || "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stars
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Data unavailable</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* GeeksforGeeks */}
            <motion.div
              className="md:col-span-2"
              style={{ gridArea: "gfg" }}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card
                className="glass h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCardClick("gfg")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-500" />
                      GeeksforGeeks
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.gfg ? (
                    <div className="flex items-center justify-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    </div>
                  ) : gfgData ? (
                    <div className="text-center p-6 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-500 mb-2">
                        {gfgData.totalSolved?.toLocaleString() || "—"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Problems Solved
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Data unavailable</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default CodingStats;
