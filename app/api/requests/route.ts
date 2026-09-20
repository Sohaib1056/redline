import { NextResponse } from "next/server";
import { createRequest, listRequests } from "@/lib/store";

const requiredFields = [
  "patient_name",
  "phone",
  "pickup_location",
  "destination",
  "service",
  "preferred_date",
  "preferred_time",
  "patient_condition",
] as const;

export function GET() {
  return NextResponse.json({ requests: listRequests() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    requiredFields.some((field) => typeof body[field] !== "string" || !body[field].trim())
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const created = createRequest({
    patient_name: body.patient_name.trim(),
    phone: body.phone.trim(),
    pickup_location: body.pickup_location.trim(),
    destination: body.destination.trim(),
    service: body.service.trim(),
    preferred_date: body.preferred_date,
    preferred_time: body.preferred_time,
    patient_condition: body.patient_condition.trim(),
    additional_information:
      typeof body.additional_information === "string"
        ? body.additional_information.trim()
        : "",
  });

  return NextResponse.json({ request: created }, { status: 201 });
}
