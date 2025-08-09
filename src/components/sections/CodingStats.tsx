import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  const [cfHandle, setCfHandle] = useState("tourist");
  const [lcHandle, setLcHandle] = useState("leetcode");
  const [ccHandle, setCcHandle] = useState("");
  const [gfgHandle, setGfgHandle] = useState("");

  const [loading, setLoading] = useState({ cf: false, lc: false, cc: false, gfg: false });
  const [cfData, setCfData] = useState<CFUserInfo | null>(null);
  const [lcData, setLcData] = useState<LCStats | null>(null);
  const [ccData, setCcData] = useState<CCStats | null>(null);
  const [gfgData, setGfgData] = useState<GFGStats | null>(null);
  const [error, setError] = useState<{ cf?: string; lc?: string; cc?: string; gfg?: string }>({});

  const fetchCF = async (h: string) => {
    try {
      setLoading((s) => ({ ...s, cf: true }));
      setError((e) => ({ ...e, cf: undefined }));
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(h)}`);
      const json = await res.json();
      if (json.status !== "OK" || !json.result?.[0]) throw new Error("Invalid handle");
      setCfData(json.result[0]);
    } catch (e: unknown) {
      setError((s) => ({ ...s, cf: (e as Error).message || "Failed" }));
      setCfData(null);
    } finally {
      setLoading((s) => ({ ...s, cf: false }));
    }
  };

  const fetchLC = async (h: string) => {
    if (!h) return;
    try {
      setLoading((s) => ({ ...s, lc: true }));
      setError((e) => ({ ...e, lc: undefined }));
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(h)}`);
      const json = await res.json();
      if (!json) throw new Error("User not found");
      setLcData({
        totalSolved: json.totalSolved ?? json.submitStats?.acSubmissionNum?.reduce?.((a: number, c: any) => a + (c.count || 0), 0),
        easySolved: json.easySolved ?? json.submitStats?.acSubmissionNum?.find?.((x: any) => x.difficulty === "Easy")?.count,
        mediumSolved: json.mediumSolved ?? json.submitStats?.acSubmissionNum?.find?.((x: any) => x.difficulty === "Medium")?.count,
        hardSolved: json.hardSolved ?? json.submitStats?.acSubmissionNum?.find?.((x: any) => x.difficulty === "Hard")?.count,
      });
    } catch (e: unknown) {
      setError((s) => ({ ...s, lc: (e as Error).message || "Failed" }));
      setLcData(null);
    } finally {
      setLoading((s) => ({ ...s, lc: false }));
    }
  };

  const fetchCC = async (_h: string) => {
    // Public, reliable client-side APIs are limited. Placeholder for future backend integration.
    setLoading((s) => ({ ...s, cc: true }));
    try {
      setCcData(null);
    } finally {
      setLoading((s) => ({ ...s, cc: false }));
    }
  };

  const fetchGFG = async (_h: string) => {
    setLoading((s) => ({ ...s, gfg: true }));
    try {
      setGfgData(null);
    } finally {
      setLoading((s) => ({ ...s, gfg: false }));
    }
  };

  const fetchAll = () => {
    fetchCF(cfHandle);
    fetchLC(lcHandle);
    fetchCC(ccHandle);
    fetchGFG(gfgHandle);
  };

  useEffect(() => {
    fetchCF(cfHandle);
  }, []);

  const anyLoading = loading.cf || loading.lc || loading.cc || loading.gfg;

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Coding Stats</h2>
          <p className="text-muted-foreground mt-2">Live profiles across platforms</p>
        </header>

        <div className="glass rounded-xl p-4 border grid gap-3 md:grid-cols-5">
          <Input value={cfHandle} onChange={(e) => setCfHandle(e.target.value)} placeholder="Codeforces handle" />
          <Input value={lcHandle} onChange={(e) => setLcHandle(e.target.value)} placeholder="LeetCode username" />
          <Input value={ccHandle} onChange={(e) => setCcHandle(e.target.value)} placeholder="CodeChef username" />
          <Input value={gfgHandle} onChange={(e) => setGfgHandle(e.target.value)} placeholder="GFG username" />
          <Button onClick={fetchAll} disabled={anyLoading}>{anyLoading ? 'Loading…' : 'Fetch All'}</Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4 auto-rows-[minmax(160px,1fr)]">
          {/* Codeforces - prominent bento card */}
          <motion.div layout whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="md:col-span-2 md:row-span-2">
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle>Codeforces</CardTitle>
              </CardHeader>
              <CardContent>
                {loading.cf && <p className="text-muted-foreground">Fetching data…</p>}
                {error.cf && <p className="text-destructive">{error.cf}</p>}
                {cfData && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Handle</div>
                      <div className="font-semibold">{cfData.handle}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-semibold">{cfData.rating ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Max Rating</div>
                      <div className="font-semibold">{cfData.maxRating ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rank</div>
                      <div className="font-semibold">{cfData.rank ?? '—'}{cfData.maxRank ? ` (max: ${cfData.maxRank})` : ''}</div>
                    </div>
                  </div>
                )}
                {!loading.cf && !cfData && !error.cf && (
                  <p className="text-muted-foreground">Enter a handle to see stats.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* LeetCode */}
          <motion.div layout whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle>LeetCode</CardTitle>
              </CardHeader>
              <CardContent>
                {loading.lc && <p className="text-muted-foreground">Fetching data…</p>}
                {error.lc && <p className="text-destructive">{error.lc}</p>}
                {lcData ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Solved</div>
                      <div className="font-semibold">{lcData.totalSolved ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Easy</div>
                      <div className="font-semibold">{lcData.easySolved ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Medium</div>
                      <div className="font-semibold">{lcData.mediumSolved ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Hard</div>
                      <div className="font-semibold">{lcData.hardSolved ?? '—'}</div>
                    </div>
                  </div>
                ) : (
                  <a className="story-link" href={`https://leetcode.com/${encodeURIComponent(lcHandle || '')}/`} target="_blank" rel="noreferrer">Open profile</a>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* CodeChef */}
          <motion.div layout whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle>CodeChef</CardTitle>
              </CardHeader>
              <CardContent>
                {loading.cc && <p className="text-muted-foreground">Fetching data…</p>}
                {error.cc && <p className="text-destructive">{error.cc}</p>}
                {ccData ? (
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="font-semibold">{ccData.rating ?? '—'} {ccData.stars ? `(${ccData.stars})` : ''}</div>
                  </div>
                ) : (
                  <a className="story-link" href={`https://www.codechef.com/users/${encodeURIComponent(ccHandle || '')}`} target="_blank" rel="noreferrer">Open profile</a>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* GeeksforGeeks */}
          <motion.div layout whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle>GeeksforGeeks</CardTitle>
              </CardHeader>
              <CardContent>
                {loading.gfg && <p className="text-muted-foreground">Fetching data…</p>}
                {error.gfg && <p className="text-destructive">{error.gfg}</p>}
                {gfgData ? (
                  <div>
                    <div className="text-sm text-muted-foreground">Solved</div>
                    <div className="font-semibold">{gfgData.totalSolved ?? '—'}</div>
                  </div>
                ) : (
                  <a className="story-link" href={`https://auth.geeksforgeeks.org/user/${encodeURIComponent(gfgHandle || '')}/`} target="_blank" rel="noreferrer">Open profile</a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
