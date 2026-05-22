import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="hidden lg:block bg-[var(--bg-alt)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo size={80} />
          <p className="mt-4 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
            Tribhovandas Bhimji Zaveri · crafting heritage jewellery since 1864. From Zaveri
            Bazaar to your doorstep.
          </p>
          <div className="gold-divider my-6 max-w-xs" />
          <p className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
            Customer Care · +91 22 4045 1000
          </p>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { href: "/collections/gold", label: "Gold" },
            { href: "/collections/diamond", label: "Diamond" },
            { href: "/collections/jadau", label: "Jadau" },
            { href: "/collections/bridal", label: "Bridal" },
            { href: "/collections/platinum", label: "Platinum" },
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            { href: "/appointment", label: "Book Appointment" },
            { href: "/stores", label: "Store Locator" },
            { href: "/gift-cards", label: "Gift Cards" },
            { href: "/kalpavruksha", label: "Kalpavruksha" },
          ]}
        />
        <FooterCol
          title="About"
          links={[
            { href: "/about", label: "Our Heritage" },
            { href: "/franchise", label: "Franchise Enquiry" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy", label: "Privacy Policy" },
          ]}
        />
      </div>
      <div className="border-t border-[var(--border)] py-5 text-center text-[11px] tracking-brand uppercase text-[var(--muted)]">
        © {new Date().getFullYear()} TBZ · The Original · A heritage of Indian jewellery since 1864
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-[var(--muted)]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-[var(--fg)]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
