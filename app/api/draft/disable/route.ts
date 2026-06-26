import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Turns off draft mode (exit preview) and returns to the homepage. */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
