import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json();
  const numericId = parseInt(id);
  console.log(numericId);

  const supabase = createClient();

  try {
    const { data: reflection, error } = await supabase
      .from("reflections")
      .select()
      .eq("id", numericId)
      .single();

    console.log("Reflection found:", reflection);
    console.log(reflection);

    return NextResponse.json(reflection);
  } catch (error) {
    console.error("Error:", error);
  }
}
