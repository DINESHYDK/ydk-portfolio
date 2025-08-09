import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CFUserInfo {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contribution?: number;
}

export const CodingStats = () => {
  const [handle, setHandle] = useState("tourist");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CFUserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCF = async (h: string) => {
    try {
      setLoading(true); setError(null);
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(h)}`);
      const json = await res.json();
      if (json.status !== "OK" || !json.result?.[0]) throw new Error("Invalid handle");
      setData(json.result[0]);
    } catch (e: unknown) {
      setError((e as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCF(handle); }, []);

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Coding Stats</h2>
          <p className="text-muted-foreground mt-2">Live Codeforces profile lookup</p>
        </header>

        <div className="max-w-2xl mx-auto grid gap-4">
          <div className="glass rounded-xl p-4 border flex gap-2">
            <Input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="Enter Codeforces handle" />
            <Button onClick={() => fetchCF(handle)} disabled={loading}>{loading ? 'Loading…' : 'Fetch'}</Button>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Codeforces</CardTitle>
            </CardHeader>
            <CardContent>
              {!loading && !data && !error && (
                <p className="text-muted-foreground">Enter a handle to see stats.</p>
              )}
              {loading && (
                <p className="text-muted-foreground">Fetching data…</p>
              )}
              {error && (
                <p className="text-destructive">{error}</p>
              )}
              {data && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Handle</div>
                    <div className="font-semibold">{data.handle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="font-semibold">{data.rating ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Max Rating</div>
                    <div className="font-semibold">{data.maxRating ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Rank</div>
                    <div className="font-semibold">{data.rank ?? '—'}{data.maxRank ? ` (max: ${data.maxRank})` : ''}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
