import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export function usePeriodInsertLogs() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ start_date, end_date }) => {
      const { error } = await supabase
        .from("periods")
        .insert([{ start_date, end_date, user_id: user.id }]);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["periodLogs"]);
    },
  });
}
