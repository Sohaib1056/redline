import type { AmbulanceRequest, RequestStatus } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var redlineRequests: AmbulanceRequest[] | undefined;
}

const sampleRequests: AmbulanceRequest[] = [
  {
    id: "demo-001",
    request_number: "AMB-1001",
    patient_name: "Ayesha Khan",
    phone: "+92 300 555 0182",
    pickup_location: "Gulberg III, Lahore",
    destination: "Shaukat Khanum Memorial Hospital",
    service: "Hospital Transfer",
    preferred_date: "2026-09-22",
    preferred_time: "10:30",
    patient_condition: "Stable; recovering after a procedure.",
    additional_information: "Family member will be travelling with the patient.",
    status: "New",
    admin_response: "",
    created_at: "2026-09-19T08:30:00.000Z",
    updated_at: "2026-09-19T08:30:00.000Z",
  },
  {
    id: "demo-002",
    request_number: "AMB-1000",
    patient_name: "Bilal Ahmed",
    phone: "+92 321 555 0124",
    pickup_location: "DHA Phase 5, Lahore",
    destination: "Punjab Institute of Cardiology",
    service: "Emergency Ambulance",
    preferred_date: "2026-09-20",
    preferred_time: "18:00",
    patient_condition: "Chest discomfort; family is monitoring symptoms.",
    additional_information: "Please call before arrival.",
    status: "Contacted",
    admin_response: "Team spoke with family. Awaiting final confirmation.",
    created_at: "2026-09-18T14:10:00.000Z",
    updated_at: "2026-09-18T15:02:00.000Z",
  },
  {
    id: "demo-003",
    request_number: "AMB-999",
    patient_name: "Sana Riaz",
    phone: "+92 333 555 0123",
    pickup_location: "Model Town, Lahore",
    destination: "National Hospital",
    service: "Critical Care Ambulance",
    preferred_date: "2026-09-18",
    preferred_time: "19:45",
    patient_condition: "Under observation.",
    additional_information: "Requires monitored transfer with oxygen support.",
    status: "Completed",
    admin_response: "Transfer completed safely.",
    created_at: "2026-09-18T14:12:00.000Z",
    updated_at: "2026-09-18T16:30:00.000Z",
  },
];

function getStore(): AmbulanceRequest[] {
  if (!globalThis.redlineRequests) {
    globalThis.redlineRequests = [...sampleRequests];
  }
  return globalThis.redlineRequests;
}

export function listRequests(): AmbulanceRequest[] {
  return [...getStore()].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getRequest(id: string): AmbulanceRequest | undefined {
  return getStore().find((r) => r.id === id);
}

export function createRequest(
  input: Omit<AmbulanceRequest, "id" | "request_number" | "status" | "admin_response" | "created_at" | "updated_at">
): AmbulanceRequest {
  const store = getStore();
  const now = new Date().toISOString();
  const request: AmbulanceRequest = {
    ...input,
    id: crypto.randomUUID(),
    request_number: `AMB-${1002 + store.length}`,
    status: "New",
    admin_response: "",
    created_at: now,
    updated_at: now,
  };
  store.push(request);
  return request;
}

export function updateRequest(
  id: string,
  updates: { status?: RequestStatus; admin_response?: string }
): AmbulanceRequest | undefined {
  const request = getRequest(id);
  if (!request) return undefined;

  if (updates.status) request.status = updates.status;
  if (typeof updates.admin_response === "string") {
    request.admin_response = updates.admin_response;
  }
  request.updated_at = new Date().toISOString();
  return request;
}
