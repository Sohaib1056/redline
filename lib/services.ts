import type { ServiceSlug } from "./types";

export type Service = {
  slug: ServiceSlug;
  shortIcon: string;
  title: string;
  shortDescription: string;
  description: string;
  includes: string[];
  whenNeeded: string;
  responseTime: string;
  staffing: string;
  keyFeatures: { title: string; desc: string }[];
  equipment: string[];
};

export const services: Service[] = [
  {
    slug: "emergency-ambulance",
    shortIcon: "🚑",
    title: "Emergency Ambulance",
    shortDescription: "Rapid 24/7 response with emergency medical care and monitored transit across New Delhi & NCR.",
    description: "When medical emergencies strike, every second counts. RedLine's Emergency Ambulance service provides priority dispatch, qualified paramedics, advanced life-support equipment, and direct communication with receiving hospital emergency departments.",
    includes: [
      "Priority 24/7 dispatch within minutes",
      "Certified emergency paramedics & EMT crew",
      "Oxygen, ECG monitor, defibrillator & emergency meds",
      "Direct telemetry & pre-arrival notice to receiving ER"
    ],
    whenNeeded: "For cardiac distress, trauma, respiratory distress, acute stroke symptoms, severe accidents, or any acute life-threatening medical emergency.",
    responseTime: "10 – 15 Minutes (Delhi NCR)",
    staffing: "Lead Paramedic + Certified EMT + Emergency Driver",
    keyFeatures: [
      { title: "Rapid GPS Routing", desc: "Real-time traffic bypassing and priority routing for minimal transit delay." },
      { title: "On-Board Monitoring", desc: "Continuous vitals monitoring, oxygen therapy, and emergency resuscitation readiness." },
      { title: "Hospital Pre-Alert", desc: "Immediate pre-arrival alert to destination hospital trauma & ER teams." }
    ],
    equipment: ["Multi-parameter Cardiac Monitor", "Automated External Defibrillator (AED)", "Medical Oxygen & Suction", "Trauma Care Kit & Splints"]
  },
  {
    slug: "patient-transfer",
    shortIcon: "🩺",
    title: "Patient Transfer",
    shortDescription: "Comfortable, planned non-emergency medical transportation between home, clinics, and diagnostic centers.",
    description: "Designed for non-emergency medical travel, our patient transfer service provides gentle, dignified transport for mobility-assisted individuals, elderly patients, or post-operative individuals requiring comfortable transport.",
    includes: [
      "Scheduled door-to-door wheelchair and stretcher service",
      "Hydraulic stretcher and ramp support",
      "Accompaniment space for family members",
      "Climate-controlled smooth suspension vehicles"
    ],
    whenNeeded: "For outpatient clinic appointments, routine checkups, dialysis visits, radiation therapy, and discharge transfers to home.",
    responseTime: "Scheduled / Guaranteed Window",
    staffing: "Patient Care Attendant + Professional Driver",
    keyFeatures: [
      { title: "Gentle Bed-to-Bed", desc: "Full assistance from patient's bed or room directly into the destination facility." },
      { title: "Family Friendly", desc: "Spacious seating reserved for family members or personal caregivers." },
      { title: "Punctual Timing", desc: "Guaranteed pickup windows ensuring zero waiting for clinic appointments." }
    ],
    equipment: ["Hydraulic Stretcher System", "Collapsible Wheelchair", "Basic Supplemental Oxygen", "Patient Safety Harness"]
  },
  {
    slug: "hospital-transfer",
    shortIcon: "🏥",
    title: "Hospital Transfer",
    shortDescription: "Inter-facility hospital transfers with specialized medical support and physician handovers.",
    description: "Seamless hospital-to-hospital medical transport when patients require specialist care, tertiary referral facilities, advanced diagnostic imaging, or step-down care transitions.",
    includes: [
      "Direct facility-to-facility coordination",
      "Comprehensive medical record & handover management",
      "Continuous IV infusion and vital signs monitoring",
      "Direct bed-to-bed admission transfer"
    ],
    whenNeeded: "For specialist referrals, ICU transfers between hospitals, step-down facility transfers, or family-requested facility changes.",
    responseTime: "Rapid Dispatch / Scheduled Inter-Hospital",
    staffing: "Nurse Specialist / Paramedic + Medical Attendant",
    keyFeatures: [
      { title: "Facility Handover", desc: "Formal physician-to-physician and nurse handover documentation en route." },
      { title: "Continuous Care", desc: "Uninterrupted IV medication administration, monitoring, and oxygen therapy." },
      { title: "Zero Wait Transfer", desc: "Coordinated receiving bed reservation prior to vehicle departure." }
    ],
    equipment: ["Infusion Pumps", "Advanced Vitals Monitor", "Portable Ventilator Ready", "Emergency Resuscitation Kit"]
  },
  {
    slug: "long-distance-transport",
    shortIcon: "🌐",
    title: "Long Distance Transport",
    shortDescription: "Inter-city and cross-state medical transport with customized comfort and continuous care.",
    description: "For medical journeys across states or cities, RedLine provides long-distance ambulance transport equipped with long-range fuel tanks, dual-driver shifts, comfortable patient suspension, and continuous medical supervision.",
    includes: [
      "Inter-city and interstate route planning",
      "Dual experienced drivers for zero fatigue",
      "Continuous paramedic observation & medical log",
      "Family companion seating & luggage space"
    ],
    whenNeeded: "For inter-city relocation, specialized medical procedures in metro hubs (Delhi NCR), or bringing patients back home.",
    responseTime: "Scheduled Advance Booking",
    staffing: "Dedicated Paramedic + Dual Interstate Drivers",
    keyFeatures: [
      { title: "Interstate Compliance", desc: "All interstate road permits, toll passes, and green channel clearances arranged." },
      { title: "Long-Range Comfort", desc: "Air-conditioned, wide-track suspension fitted for long-highway smoothness." },
      { title: "Family Rest Stop Plan", desc: "Planned hygienic hydration and rest stops coordinated with medical status." }
    ],
    equipment: ["Extended Oxygen Reserve", "Multi-Lead ECG & Monitor", "Inverter Power for Medical Devices", "Patient Comfort Care Kit"]
  },
  {
    slug: "critical-care-ambulance",
    shortIcon: "⚡",
    title: "Critical Care Ambulance",
    shortDescription: "Advanced Mobile ICU transport with ICU ventilators, critical care paramedics, and doctor readiness.",
    description: "Our Mobile ICU ambulances provide intensive care level monitoring and life support during transport for critically ill, intubated, or unstable patients who require maximum medical support en route.",
    includes: [
      "Mobile ICU (MICU) vehicle configuration",
      "ICU-trained paramedic / critical care nurse",
      "Transport ventilator, invasive arterial pressure monitoring",
      "Syringe pumps, defibrillator & emergency ICU pharmacy"
    ],
    whenNeeded: "For ventilator-dependent transfers, post-cardiac surgery moves, severe sepsis, organ failure transport, or high-acuity ICU movements.",
    responseTime: "Priority Dispatch / Emergency Ready",
    staffing: "Critical Care Doctor / Specialist Nurse + Senior Paramedic",
    keyFeatures: [
      { title: "Advanced Life Support", desc: "Full Mobile ICU capability with mechanical ventilation and cardiac monitoring." },
      { title: "Physician Escort", desc: "Optional critical care physician escort for unstable or high-risk transfers." },
      { title: "Continuous Inotrope Support", desc: "Precision syringe pumps for cardiac and vasoactive drug administration." }
    ],
    equipment: ["Transport Mechanical Ventilator", "Multi-Channel Syringe & Infusion Pumps", "Biphasic Defibrillator & Pacer", "Blood Gas & Emergency ICU Meds"]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
