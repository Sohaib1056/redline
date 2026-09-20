export const serviceSlugs = [
  "emergency-ambulance",
  "patient-transfer",
  "hospital-transfer",
  "long-distance-transport",
  "critical-care-ambulance",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type AmbulanceRequest = {
  id: string;
  request_number: string;
  patient_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  patient_condition: string;
  additional_information: string;
  status: RequestStatus;
  admin_response: string;
  created_at: string;
  updated_at: string;
};

export type RequestInput = Omit<
  AmbulanceRequest,
  "id" | "request_number" | "status" | "admin_response" | "created_at" | "updated_at"
>;

export type RequestStatus =
  | "New"
  | "Contacted"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export const requestStatuses: RequestStatus[] = [
  "New",
  "Contacted",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];
