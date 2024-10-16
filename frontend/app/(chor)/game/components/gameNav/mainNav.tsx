import Link from "next/link";
import OneVOne from "./oneVOne";
import TwoVTwo from "./twoVTwo";

const MainNav = ({
  mode,
  setMode,
}: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<"local" | "online" | "main">>;
}) => {
  return (
    <div
      className={`absolute flex flex-col md:flex-row gap-7 items-center justify-center h-fit w-full rounded-md top-0 ${
        mode === "main"
          ? "left-0 transition-all duration-500 ease-in-out"
          : "-left-[3000px] transition-all duration-500 ease-in-out"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl">Modes</div>
        <div className="flex flex-col md:flex-row w-full h-fit top-0 z-30 flex-wrap items-center md:items-start justify-center gap-4">
          <div onClick={() => setMode("local")} className="cursor-pointer">
            <OneVOne type="local" />
          </div>
          <div onClick={() => setMode("online")} className="cursor-pointer">
            <OneVOne type="online" />
          </div>

          <Link href="/game/twoVtwo">
            <div>
              <TwoVTwo />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
