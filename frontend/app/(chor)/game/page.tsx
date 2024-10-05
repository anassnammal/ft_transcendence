"use client";
import getCookie from "@/lib/functions/getCookie";
import { Card } from "@/components/ui/card";
import OneVOne from "./components/gameNav/oneVOne";
import TwoVTwo from "./components/gameNav/twoVTwo";
import TournamentNav from "./components/gameNav/tournament";
import Invitations from "./components/invitations";
import Link from "next/link";
import TabStates from "../profile/components/tabStates";
import useGetUser from "../profile/hooks/useGetUser";

export default function Page() {
  const { data: user } = useGetUser("0");
  const user_id = user?.id;

  // window.addEventListener('offline', () => {
  //     // console.log("offline");
  // }
  // );

  return (
    <Card className=" flex flex-col gap-2 p-4">
      <div className="pb-2  w-full">Modes</div>
      <div className="flex flex-wrap gap-5 justify-center  max-h-full  p-6  bg-secondary/40 rounded-md">
        <Link href="/game/local">
          <div>
            <OneVOne type="local" />
          </div>
        </Link>
        <Link href="/game/oneVone">
          <div>
            <OneVOne type="two" />
          </div>
        </Link>
        <Link href="/game/twoVtwo">
          <div>
            <TwoVTwo />
          </div>
        </Link>
        <Link href="/game/tournament">
          <div>
            <TournamentNav />
          </div>
        </Link>
      </div>
      <div className="pb-2  w-full h-full flex flex-col gap-2">
        <div className="w-full h-fit">
          <Invitations mode="all" />
        </div>
        <div className=" h-full w-full flex flex-col md:flex-row gap-4">
          <TabStates id={user_id} />
        </div>
      </div>
    </Card>
  );
}
