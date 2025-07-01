import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export function useSubmitTip() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ title, description, tag }) => {
      const { error } = await supabase.from("tips").insert({
        title,
        content: description,
        tag,
        user_id: user.id,
        date_posted: new Date().toISOString(),
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tips"]);
    },
  });
}