import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeaderboardEntry = {
  id: number;
  username: string;
  time_ms: number;
  created_at: string;
};

export async function submitScore(username: string, timeMs: number): Promise<LeaderboardEntry | null> {
  const { data, error } = await supabase
    .from("leaderboard")
    .insert({ username, time_ms: timeMs })
    .select()
    .single();

  if (error) {
    console.error("Error submitting score:", error);
    return null;
  }

  return data;
}

export async function getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("time_ms", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  return data || [];
}
