import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { avatar, name, body, vote, ayat } = await request.json();
  console.log(avatar, name, body, vote, ayat);

  const supabase = createClient();
  try {
    const { data: reflections, error } = await supabase
      .from("reflections")
      .insert({
        avatar: avatar,
        name: name,
        body: body,
        vote: vote,
      })
      .single();
    console.log("working good");
    if (error) {
      throw error;
    }
    return NextResponse.json(reflections);
  } catch (error) {
    console.error("Error inserting reflection:", error);
  }
}
