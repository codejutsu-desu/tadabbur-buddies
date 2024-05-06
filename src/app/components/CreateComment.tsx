"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CreateCommentProps {
  imageUrl?: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ imageUrl }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const mockData = {
      avatar: { imageUrl },
      name: "John Doe",
      body: comment,
      vote: 5,
      ayat: "Lorem ipsum dolor sit amet.",
    };

    try {
      const response = await fetch("/api/CreateReflection", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockData),
      });

      if (!response.ok) {
        throw new Error("Failed to create reflection");
      }

      console.log("Reflection created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating reflection:", error);
    }
  };

  return (
    <div className="flex w-3/4 p-2 bg-white rounded-lg shadow-lg gap-2">
      <div>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <Textarea
          className="h-40"
          placeholder="Type your reflection here."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
};

export default CreateComment;
