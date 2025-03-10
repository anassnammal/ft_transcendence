"use client";


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifyOtp from "./hooks/useVerifyOtp";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [value, setValue] = useState("");
  const { mutate } = useVerifyOtp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");
  
  useEffect(() => {
    if (!user_id) {
      router.push("/login");
      return;
    }
    if (value.length === 6) {
      mutate({
        otp: value,
        user_id: user_id as string,
      });
      setValue("");
    }
  }, [value, user_id, mutate, router]);

  return (
    <div className="space-y-2 w-full  h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Verify the OTP : </h1>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        size={3}
      >
        <InputOTPGroup className="w-full ">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={() => router.push("/login")}>Go back</Button>
    </div>
  );
}
