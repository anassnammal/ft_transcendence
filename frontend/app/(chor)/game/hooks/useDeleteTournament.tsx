import axiosInstance from "@/lib/functions/axiosInstance";
import useInvitationSocket from "@/app/(chor)/game/hooks/sockets/useInvitationSocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteTournament = async (tournamentId: string) => {
  try {
    // console.log(tournamentId);
    const res = await axiosInstance.post("/game/deleteTournament", {
      tournamentId: tournamentId,
    });
    if (res.status === 404) {
      // console.log("Tournament not found");
    }
  } catch (error) {
    // console.log(error);
  }
  return tournamentId;
}; // todo: work on the delete tournament logic

export default function useDeletetournament() {
  const { handleRefetchTournament } = useInvitationSocket();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTournament,
    onSuccess: (tournamentId) => {
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
      queryClient.invalidateQueries({ queryKey: ["gameTournament"] });
      handleRefetchTournament(tournamentId);
    },
  });
  return mutation;
}
