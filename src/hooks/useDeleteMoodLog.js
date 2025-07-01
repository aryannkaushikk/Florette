import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useDeleteMoodLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logId) => {
      const { error } = await supabase
        .from("mood_logs")
        .delete()
        .eq("id", logId);

      if (error) throw error;
    },
    onSuccess: (_, logId, context) => {
      queryClient.invalidateQueries({ queryKey: ["moodLogs"] });
    },
  });
}
