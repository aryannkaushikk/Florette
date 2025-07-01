import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useTips() {
  return useQuery({
    queryKey: ["tips"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .order("date_posted", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
  });
}
