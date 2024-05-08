"use client";
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { getTimeDifference } from "@/utils/supabase/functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";

interface Reflection {
  id: string;
  created_at: string;
  avatar: string;
  name: string;
  body: string;
  vote: number;
  ayat: string;
}

export default function Page() {
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const { slug: id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchReflection = async () => {
      try {
        const response = await fetch("/api/GetComment", {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const reflectionData = await response.json();
        setReflection(reflectionData);
      } catch (error) {
        console.error("Error fetching reflection:", error);
      }
    };

    fetchReflection();
  }, []);

  const handleVoteChange = () => {
    // Implement your vote change logic here
  };

  const handleDoubleClick = () => {
    // Implement your double click logic here
  };

  if (!reflection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-2 mx-auto bg-white rounded-lg shadow-lg gap-2 w-3/4">
      <div className="flex flex-col items-center bg-slate-50 p-1">
        <div onClick={handleVoteChange} onDoubleClick={handleDoubleClick}>
          <Heart color={"#000000"} fill={"none"} className="cursor-pointer" />
        </div>
        <div>{reflection.vote}</div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2 justify-between items-center">
            <div>
              <Avatar>
                <AvatarImage src={reflection.avatar} alt={reflection.name} />
                <AvatarFallback>{reflection.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="xl:text-xl">{reflection.name}</div>
            <div className="text-sm xl:text-md">
              {getTimeDifference(reflection.created_at)}
            </div>
          </div>
        </div>
        <div>
          <div className={`break-all bg-slate-50 p-1`}>{reflection.body}</div>
        </div>
      </div>
    </div>
  );
}
