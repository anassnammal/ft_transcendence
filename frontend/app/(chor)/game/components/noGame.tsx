import { useEffect, useRef, useState } from "react";

const NoGame = ({ state }: { state: React.MutableRefObject<string> }) => {
  const atext = useRef<string>("Invite a friend to play");

  useEffect(() => {
    if (state.current === "win") {
      atext.current = "You won";
    } else if (state.current === "lose") {
      atext.current = "You lose";
    } else if (state.current === "surrender") {
      atext.current = "Your teammate has surrendered";
    } else if (state.current === "surrendered") {
      atext.current = "Your enemy has surrendered";
    } else if (state.current === "none") {
      atext.current = "Invite a friend to play";
    } else if (state.current === "left") {
      atext.current = "The left player wins the game";
    } else if (state.current === "right") {
      atext.current = "The right player wins the game";
    } else if (state.current === "local") {
      atext.current = "Start a local game";
    } else if (state.current === "tournament") {
      atext.current = "Join a tournament";
    } else if (state.current === "leave") {
      atext.current = "Your enemy has left the game";
    }
  }, [state.current]);

  return (
    <div className="w-full h-full flex flex-col relative rounded-lg">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.75,
        }}
      />
      <div className="text-white text-xl z-20 md:text-3xl m-auto text-container">
        {atext.current}
      </div>
    </div>
  );
};

export default NoGame;
