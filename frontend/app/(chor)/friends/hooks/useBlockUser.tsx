import axiosInstance from "@/lib/functions/axiosInstance";
import { User } from "@/lib/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import useChatSocket from "../../game/hooks/sockets/useChatSocket";

async function block(to_block_id: string) {
  const response = await axiosInstance.post(`friends/block/${to_block_id}`);
  return response.data;
}

export default function useBlock() {
  const queryClient = useQueryClient();
 const {sendJsonMessage} = useChatSocket()
  const mutation = useMutation({
    mutationFn: ({ to_block, user_id }: { to_block: User; user_id: string }) =>
      block(to_block.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["friends", variables.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["blocked"],
      });
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      sendJsonMessage({ message: `/friendUpdate ${variables.to_block.id}` });

      toast.success("blocked successfully");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
  });
  return mutation;
}
