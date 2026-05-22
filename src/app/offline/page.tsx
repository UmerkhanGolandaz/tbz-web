export const metadata = { title: "Offline · TBZ" };

export default function Offline() {
  return (
    <section className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl mb-4">You&apos;re offline</h1>
      <p className="text-[var(--muted)]">
        It looks like you&apos;ve lost connection. Some saved pages will still work.
        Reconnect to view our latest collections.
      </p>
    </section>
  );
}
