import { User } from "@/lib/types";
import { UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { canvasParams } from "../types";

function enemyLeftGame(
  canvasParams: canvasParams,
  time: React.MutableRefObject<number>,
  enemyLeftGameRef: React.MutableRefObject<boolean>,
  gameStartedRef: React.MutableRefObject<boolean>,
  handleTime: (time: number) => void,
  endGame: (data: {
    winner: string;
    winnerScore: number;
    loser: string;
    loserScore: number;
  }) => void,
  handleDisconnect: () => void
) {
  const { canvas, leftUserRef, rightUserRef } = canvasParams;
  if (canvas === null) return;
  const currnetTime = new Date().getTime();
  const seconds = Math.floor(currnetTime / 1000);
  if (
    (!enemyLeftGameRef.current &&
      seconds % 2 === 0 &&
      seconds !== time.current) ||
    time.current === 0
  ) {
    enemyLeftGameRef.current = true;
    time.current = seconds;
    // console.log("current time: " + time.current + "seconds: " + seconds);
    handleTime(time.current);
  } else {
    if (seconds - time.current > 5) {
      toast.error("Enemy left the game");
      endGame({
        winner: leftUserRef.current?.id || "",
        winnerScore: 3,
        loser: rightUserRef.current?.id || "",
        loserScore: 0,
      });
      // handleDisconnect();
      enemyLeftGameRef.current = false;
      gameStartedRef.current = false;
      time.current = 0;
    }
  }
}

export default enemyLeftGame;
