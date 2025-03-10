import { User } from "@/lib/types";
import { PreGameProfile } from "./preGameProfile";

const PreGame = ({
  type,
  leftUserTop,
  rightUserTop,
  leftUserBottom,
  rightUserBottom,
}: {
  type: string;
  leftUserTop: User | null | undefined;
  rightUserTop: User | null | undefined;
  leftUserBottom: User | null | undefined;
  rightUserBottom: User | null | undefined;
}) => {
  return (
    <div
      className="w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: "url('/game.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col w-full h-full px-4 md:px-14 py-8 lg:py-1 gap-2">
        <div className="flex flex-row lg:justify-center justify-between w-full h-full items-center">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-md justify-center items-center flex flex-col animate-getBigger animate-biggerSmaller bg-blue-500">
            <PreGameProfile avatar={leftUserTop?.avatar || ""} side="left" />
          </div>
          <div className="flex flex-row w-fit h-full m-auto">
            {type !== "four" && (
              <div className="text-2xl md:text-5xl lg:text-7xl text-white font-bold h-fit my-auto">
                VS
              </div>
            )}
            {type === "four" && (
              <div className="text-2xl md:text-5xl lg:text-7xl text-white font-bold h-fit mt-auto">
                VS
              </div>
            )}
          </div>
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-md justify-center items-center flex flex-col animate-getBigger animate-biggerSmaller bg-red-500">
            <PreGameProfile avatar={rightUserTop?.avatar || ""} side="right" />
          </div>
        </div>
        {(leftUserBottom || rightUserBottom) && (
          <div className="flex flex-row lg:justify-center justify-between w-full h-full items-center gap-10 md:gap-44 lg:gap-60">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-md justify-center items-center flex flex-col animate-getBigger animate-biggerSmaller ml-auto bg-blue-500">
              <PreGameProfile
                avatar={leftUserBottom?.avatar || ""}
                side="left"
              />
            </div>
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-md justify-center items-center flex flex-col animate-getBigger animate-biggerSmaller mr-auto bg-red-500">
              <PreGameProfile
                avatar={rightUserBottom?.avatar || ""}
                side="right"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreGame;
