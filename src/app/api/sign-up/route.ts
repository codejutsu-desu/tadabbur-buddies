import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, location, password } = await request.json();

    const supabase = createClient();

    const { data: user, error } = await supabase
      .from("users")
      .insert([{ name, email, location, password }]);

    if (error) {
      throw new Error("Failed to insert user data");
    }

    console.log("User data inserted successfully:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error inserting user data:", error);
  }
}
