import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function usePeriodLogs(userId) {
  return useQuery({
    queryKey: ['periodLogs', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('periods')
        .select()
        .eq('user_id', userId);

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId // only run if userId exists
  });
}
