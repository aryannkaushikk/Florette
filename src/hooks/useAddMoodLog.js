import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useAddMoodLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog) => {
      const { data, error } = await supabase
        .from("mood_logs")
        .insert([newLog])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, newLog) => {
      queryClient.invalidateQueries(["moodLogs", newLog.user_id]);
    },
  });
}
