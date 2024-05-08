"use client";
import React, { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react"; // Import the Heart icon
import { getTimeDifference } from "@/utils/supabase/functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Reflection {
  id: string;
  created_at: string;
  avatar: string;
  name: string;
  body: string;
  vote: number;
  ayat: string;
}

interface Props {
  reflection: Reflection;
}

export default function CommentBox({ reflection }: Props) {
  const [vote, setVote] = useState(reflection.vote);
  const [hasVoted, setHasVoted] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      );
      const lines = contentRef.current.clientHeight / lineHeight;
      setShowReadMore(lines > 4);
    }
  }, []);

  const handleVoteChange = async () => {
    if (!hasVoted && !doubleClicked) {
      const newVote = vote + 1;
      setVote(newVote);
      setHasVoted(true);

      try {
        const response = await fetch("/api/UpdateVote", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: reflection.id, vote: newVote }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to update vote");
        }
        console.log("Vote updated successfully:", data);
      } catch (error) {
        console.error("api not working");
        setVote(vote);
        setHasVoted(false);
      }
    }
  };

  const handleDoubleClick = () => {
    setDoubleClicked(true);
  };

  return (
    <div className="flex p-2 bg-white rounded-lg shadow-lg gap-2 w-3/4">
      <div className="flex flex-col items-center bg-slate-50 p-1">
        <div onClick={handleVoteChange} onDoubleClick={handleDoubleClick}>
          <Heart
            color={hasVoted || doubleClicked ? "#ff0000" : "#000000"}
            fill={hasVoted || doubleClicked ? "#ff0000" : "none"}
            className="cursor-pointer"
          />
        </div>
        <div>{vote}</div>
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
          <div
            ref={contentRef}
            className={`break-all bg-slate-50 p-1 ${
              showReadMore ? "max-h-20 overflow-hidden" : ""
            }`}
          >
            {reflection.body}
          </div>
          {showReadMore && (
            <a
              href={`dashboard/${reflection.id}`}
              className="text-blue-500 flex justify-end underline hover:underline"
            >
              Read More
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
