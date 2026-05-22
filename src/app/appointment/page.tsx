import { Suspense } from "react";
import AppointmentForm from "./AppointmentForm";

export const metadata = { title: "Book Appointment · TBZ" };

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[var(--muted)]">Loading…</div>}>
      <AppointmentForm />
    </Suspense>
  );
}
