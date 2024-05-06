import React from "react";
import CommentBox from "../components/CommentBox";
import { createClient } from "@/utils/supabase/server";
import CreateComment from "../components/CreateComment";

export default async function page() {
  const supabase = createClient();

  const { data: ayat } = await supabase.from("ayat").select();

  let { data: reflections } = await supabase.from("reflections").select();

  if (!reflections) {
    reflections = [];
  }

  reflections = reflections?.sort((a, b) => b.vote - a.vote);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="md:text-lg xl:text-4xl font-bold ">Tadabbur Buddies</div>
      <div className="md:text-base xl:text-xl text-center">{ayat[0].ayat}</div>
      <div className="xl:text-xl">Reflections</div>
      {reflections?.map((reflection) => (
        <CommentBox key={reflection.id} reflection={reflection} />
      ))}
      <CreateComment />
    </div>
  );
}
