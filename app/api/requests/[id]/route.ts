import { NextResponse } from "next/server";
import { getRequest, updateRequest } from "@/lib/store";
import { requestStatuses } from "@/lib/types";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const request = getRequest(id);
  return request
    ? NextResponse.json({ request })
    : NextResponse.json({ error: "Request not found." }, { status: 404 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (
    !body ||
    (body.status && !requestStatuses.includes(body.status)) ||
    typeof body.admin_response !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request update." }, { status: 400 });
  }

  const updated = updateRequest(id, { status: body.status, admin_response: body.admin_response });
  return updated
    ? NextResponse.json({ request: updated })
    : NextResponse.json({ error: "Request not found." }, { status: 404 });
}
