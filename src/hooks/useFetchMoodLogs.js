import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useFetchMoodLogs(userId) {
  return useQuery({
    queryKey: ["moodLogs", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mood_logs")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
