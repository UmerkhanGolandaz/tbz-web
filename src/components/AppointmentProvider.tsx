"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Appointment = {
  id: string;
  storeId: string;
  date: string; // ISO date
  time: string; // HH:MM
  category: string;
  notes?: string;
  createdAt: string;
};

type Ctx = {
  appointments: Appointment[];
  book: (a: Omit<Appointment, "id" | "createdAt">) => Appointment;
  cancel: (id: string) => void;
};

const C = createContext<Ctx | null>(null);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, set] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbz.appointments");
      if (raw) set(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Appointment[]) => {
    localStorage.setItem("tbz.appointments", JSON.stringify(next));
    set(next);
  };

  return (
    <C.Provider
      value={{
        appointments,
        book(a) {
          const appt: Appointment = {
            ...a,
            id: "apt_" + Math.random().toString(36).slice(2, 9),
            createdAt: new Date().toISOString(),
          };
          persist([appt, ...appointments]);
          return appt;
        },
        cancel(id) {
          persist(appointments.filter((x) => x.id !== id));
        },
      }}
    >
      {children}
    </C.Provider>
  );
}

export function useAppointments() {
  const v = useContext(C);
  if (!v) throw new Error("useAppointments must be used inside AppointmentProvider");
  return v;
}
