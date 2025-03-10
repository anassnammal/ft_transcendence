"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useSearchFriend from "../hooks/useSearchFriend";
import { User } from "@/lib/types";
import Link from "next/link";
import ChatFriendCard from "@/app/(chor)/chat/components/chatFriendCard";

export default function SearchFriend() {
  const { mutate: search, isPending, isSuccess, data } = useSearchFriend();
  const [resVisible, setResVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search({ slug: searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, search]);
  return (
    <div
      className=" mx-auto py-2   max-w-[61rem] "
      onBlur={() => setTimeout(() => setResVisible(false), 200)}
    >
      <div className=" h-12 px-2 w-full relative  ">
        <Search size={20} className="absolute end-6 top-4 " />
        <Input
          placeholder="Search"
          className="h-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setResVisible(true)}
        />
      </div>
      {data && data.length > 0 && (
        <div className=" absolute z-50 w-full mt-2  dark:bg-black bg-gray-300   rounded-lg max-w-[61rem]">
          {isSuccess && resVisible && (
            <>
              {isPending ? (
                <div>Loading...</div>
              ) : (
                data && (
                  <div className="h-96 p-2 rounded-sm  overflow-auto no-scrollbar">
                    {data.map((friend: User) => (
                      <Link
                        key={friend.id}
                        className="cursor-pointer"
                        href={`/profile/${friend.id.toString()}`}
                      >
                        <ChatFriendCard
                          friend={friend}
                          setReceiverId={() => {}}
                        />
                      </Link>
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
