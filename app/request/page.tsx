import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicShell } from "@/components/public-shell";
import { RequestForm } from "@/components/request-form";

export const metadata: Metadata = {
  title: "Request an Ambulance | RedLine",
  description:
    "Submit an ambulance or patient transport request. Our dispatch team will contact you to confirm availability and timing.",
};

export default function RequestPage() {
  return (
    <PublicShell>
      <main className="form-shell">
        <Suspense fallback={<div className="admin-loading">Loading request form…</div>}>
          <RequestForm />
        </Suspense>
      </main>
    </PublicShell>
  );
}
