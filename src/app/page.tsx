"use client";
import { useEffect, useState } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [sign, setSign] = useState(true);

  const handleClick = () => {
    setSign((prevSign) => !prevSign);
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="col-span-2 bg-green-300 flex justify-center items-center">
        <div className="flex flex-col  gap-2">
          <div className="flex justify-center">
            <h1>Tadabbur Buddies</h1>
          </div>
          <div className="text-3xl text-center">
            {sign ? "Sign in to your account" : "Sign up for an account"}
          </div>
          <div>{sign ? <Signin /> : <Signup />}</div>
        </div>
      </div>
      <div className="col-span-1 bg-zinc-600  flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <div className="text-4xl text-center text-white font-bold ">
            Hello Friend!
          </div>
          <div className="text-2xl text-center text-white font-semibold">
            Fill up your information and start your journey with us
          </div>
          <div className="flex justify-center">
            <Button onClick={handleClick} size="lg">
              {sign ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
