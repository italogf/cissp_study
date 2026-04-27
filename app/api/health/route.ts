import { getServerEnv } from "@/lib/env";

export function GET() {
  getServerEnv();

  return Response.json({
    status: "ok",
    service: "cissp-focus-studio"
  });
}
