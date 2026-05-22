export const metadata = { title: "Privacy · TBZ" };

export default function Privacy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 prose-sm">
      <h1 className="text-4xl mb-3">Privacy Policy</h1>
      <div className="gold-divider my-6 max-w-xs" />
      <div className="space-y-4 text-[var(--muted)] leading-relaxed">
        <p>
          TBZ · The Original respects your privacy. We collect only the information
          required to deliver our services · your name, phone, email, and visit
          preferences. We do not sell or share your data with third parties for
          marketing.
        </p>
        <p>
          OTP authentication is processed in-memory for this preview; in production it is
          backed by encrypted storage and short-lived tokens. Appointment data is stored
          locally on your device until confirmed by our boutique team.
        </p>
        <p>
          For any data request, write to{" "}
          <a className="text-[var(--gold-dark)] underline" href="mailto:privacy@tbz.in">
            privacy@tbz.in
          </a>
          .
        </p>
      </div>
    </section>
  );
}
