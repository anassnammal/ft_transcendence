import { User } from "lucide-react";
import { useState } from "react";

const OneVOne = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        className={`w-52 h-52 bg-background flex flex-col justify-center items-center rounded-xl shadow-primary shadow-sm transition duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 relative`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={
            `absolute w-full h-full flex flex-col justify-center items-center transition duration-300 ease-in-out` +
            (hover ? "transform opacity-0" : "transform opacity-100")
          }
        >
          <User size={150} />
          <div className="text-2xl font-bold">1 v 1</div>
        </div>
        <div
          className={`w-full h-full flex flex-row justify-between items-left transition duration-300 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          } absolute`}
        >
          <div className="bg-primary h-20 w-3 animate-moveDown"></div>
          <div className="h-full w-full">
            <div className="bg-primary h-3 w-3 animate-moveArround"></div>
          </div>
          <div className="bg-primary h-20 w-3 animate-moveUp"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes moveDown {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(150%);
          }
        }

        .animate-moveDown {
          animation: moveDown 4s ease-in-out infinite;
        }

        @keyframes moveUp {
          0%,
          100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(75%);
          }
          50% {
            transform: translateY(150%);
          }
          75% {
            transform: translateY(75%);
          }
        }

        .animate-moveUp {
          animation: moveUp 4s ease-in-out infinite;
        }
        @keyframes moveArround {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(1500%) translateY(700%);
          }
          50% {
            transform: translateX(0%) translateY(1400%);
          }
          75% {
            transform: translateX(1500%) translateY(700%);
          }
        }
        .animate-moveArround {
          animation: moveArround 4s linear infinite;
        }
      `}</style>
    </>
  );
};

export default OneVOne;
