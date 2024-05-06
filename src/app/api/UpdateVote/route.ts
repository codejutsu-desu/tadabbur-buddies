import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { id, vote } = await request.json();
  const voteValue = parseInt(vote);
  console.log(id, voteValue);
  const supabase = createClient();
  try {
    const { data: reflections } = await supabase
      .from("reflections")
      .update({ vote: voteValue })
      .eq("id", id)
      .select();
    console.log("working good");
    return NextResponse.json(reflections);
  } catch (error) {
    console.error("Error updating reflection:", error);
  }
}
