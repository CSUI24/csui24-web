import { methodNotAllowed, success } from "@/lib/api";
import { commentNames } from "@/modules/comment-names";

export function GET() {
  const randomIndex = Math.floor(Math.random() * commentNames.length);
  return success("Name fetched successfully", commentNames[randomIndex]);
}

export function POST() {
  return methodNotAllowed(["GET"]);
}
