import { json, methodNotAllowed } from "@/lib/api";
import { commentNames } from "@/modules/comment-names";

export function GET() {
  const randomIndex = Math.floor(Math.random() * commentNames.length);
  const randomName = commentNames[randomIndex];

  return json({
    success: true,
    message: "Name fetched successfully",
    data: randomName,
  });
}

export function POST() {
  return methodNotAllowed(["GET"]);
}
