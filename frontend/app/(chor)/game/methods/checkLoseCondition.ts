import { User } from "@/lib/types";
import { toast } from "sonner";
import { canvasParamsFour } from "../types";

function checkLoseConditionOnline(
  canvas: HTMLCanvasElement | null,
  leftScoreRef: React.MutableRefObject<number>,
  rightScoreRef: React.MutableRefObject<number>,
  leftUser: User | undefined,
  rightUser: User | undefined,
  endGame: (data: {
    winner: string;
    winnerScore: number;
    loser: string;
    loserScore: number;
  }) => void,
  gameStartedRef: React.MutableRefObject<boolean>,
  setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
) {
  if (canvas === null) return;
  if (rightScoreRef.current >= 77777) {
    gameStartedRef.current = false;
    setCanvas(null);
    // alert("1 score is " + rightScoreRef.current);
    endGame({
      winner: rightUser?.id || "",
      winnerScore: rightScoreRef.current,
      loser: leftUser?.id || "",
      loserScore: leftScoreRef.current,
    });
  }
}

function checkLoseConditionFour(
  canvasParams: canvasParamsFour,
  canvas: HTMLCanvasElement | null,
  leftScoreRef: React.MutableRefObject<number>,
  rightScoreRef: React.MutableRefObject<number>,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  endGameFour: (data: {
    winner: string;
    winnerScore: number;
    loser: string;
    loserScore: number;
  }) => void,
  username: string,
  handleRefetchPlayers: (gameId: string) => void
) {
  if (canvas === null) return;
  const {
    userLeftTop: leftUserTop,
    userLeftBottom: leftUserBottom,
    userRightTop: rightUserTop,
    userRightBottom: rightUserBottom,
  } = canvasParams;
  if (rightScoreRef.current >= 77777 || leftScoreRef.current >= 77777) {
    // handleRefetchPlayers(canvasParams.gameId);
    setGameStarted(false);
    if (rightScoreRef.current >= 77777) {
      if (username === leftUserTop.current?.username) {
        endGameFour({
          winner: rightUserTop.current?.id || "",
          winnerScore: rightScoreRef.current,
          loser: leftUserTop.current?.id || "",
          loserScore: leftScoreRef.current,
        });
      }
      if (
        username === rightUserTop.current?.username ||
        username === rightUserBottom.current?.username
      ) {
        toast.success("You have won the game");
      }
    }
    if (leftScoreRef.current >= 77777) {
      if (username === rightUserTop.current?.username) {
        endGameFour({
          winner: leftUserTop.current?.id || "",
          winnerScore: leftScoreRef.current,
          loser: rightUserTop.current?.id || "",
          loserScore: rightScoreRef.current,
        });
      }
      if (
        username === leftUserTop.current?.username ||
        username === leftUserBottom.current?.username
      ) {
        toast.error("You have lost the game");
      }
    }
  }
}

export { checkLoseConditionOnline, checkLoseConditionFour };
