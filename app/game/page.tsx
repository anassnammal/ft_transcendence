"use client";
import getCookie from "@/lib/functions/getCookie";

import useGetUser from "../profile/hooks/useGetUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameNav from "./components/gameNav/gameNav";
import Two from "./components/two";
import OneOffline from "./components/oneOffline";
import Four from "./components/four";
import Tournament from "./components/tournament";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Crown, Diamond, User, Users } from "lucide-react";
import GamesTable from "../profile/components/gamesTable";
import OneVOne from "./components/gameNav/oneVOne";
export default function Page() {
  const user_id = getCookie("user_id") || "";
  const { data: user, isSuccess, isLoading } = useGetUser(user_id || "0");
  const router = useRouter();
  const [tab, setTab] = useState("tab");

  useEffect(() => {
    if (!user && isSuccess) {
      router.push("/login");
    }
  }, [user, isSuccess, router]);

  if (isLoading) return <div>loading...</div>;

  // window.addEventListener('offline', () => {
  //     console.log("offline");
  // }
  // );

  return (
    <div className="relative w-full h-full">
      <GameNav setTab={setTab} tab={tab} />
      <Card className="w-11/12 h-fit flex flex-col justify-start items-start p-2 mx-auto mt-12 gap-2">
        {tab !== "tab" && (
          <div
            className="w-15 h-15 bg-background flex flex-col justify-center items-center rounded-xl shadow-primary shadow-sm"
            onClick={() => setTab("tab")}
          >
            <ArrowLeft size={30} />
          </div>
        )}
        {tab === "tab" && (
          <>
            <div className="flex flex-row gap-4">
              <div onClick={() => setTab("two")}>
                <OneVOne />
              </div>
              <div
                className="w-52 h-52 bg-background flex flex-col justify-center items-center rounded-xl shadow-primary shadow-sm"
                onClick={() => setTab("local")}
              >
                <Diamond size={150} />
                <div className="text-2xl font-bold">Local</div>
              </div>
              <div
                className="w-52 h-52 bg-background flex flex-col justify-center items-center rounded-xl shadow-primary shadow-sm"
                onClick={() => setTab("four")}
              >
                <Users size={150} />
                <div className="text-2xl font-bold">2 v 2</div>
              </div>
              <div
                className="w-52 h-52 bg-background flex flex-col justify-center items-center rounded-xl shadow-primary shadow-sm"
                onClick={() => setTab("tournament")}
              >
                <Crown size={150} />
                <div className="text-2xl font-bold">Tournament</div>
              </div>
            </div>
            <GamesTable id={user_id} />
          </>
        )}
        {tab === "two" && (
          <div className="flex flex-col w-full h-full justify-start items-center">
            <Two type="two" />
          </div>
        )}
        {tab === "local" && (
          <>
            <OneOffline />
          </>
        )}
        {tab === "four" && (
          <>
            <div className="flex flex-col w-full h-full justify-start items-cente left-0">
              <Four />
            </div>
          </>
        )}
        {tab === "tournament" && (
          <>
            <div className="flex flex-col w-full h-full justify-start items-center left-0">
              <Tournament />
            </div>
          </>
        )}
      </Card>
      <div className="w-full h-fit flex flex-row justify-start items-start mt-10"></div>
    </div>
  );
}
