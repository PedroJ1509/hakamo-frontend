import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { Logo } from "./logo";
import type { NavLink, SitePublic } from "@/lib/visual-kit/types";
import { btnPrimary } from "@/lib/visual-kit/styles";

export function PublicFooter({
  site,
  links,
  staffHref = "/empleos",
  staffLabel = "Busco empleo",
  ctaHref,
  ctaLabel,
  tone = "night",
}: {
  site: SitePublic;
  links: NavLink[];
  staffHref?: string;
  staffLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  tone?: "night" | "paper";
}) {
  const paper = tone === "paper";
  const actionHref = ctaHref ?? site.ctaHref;
  const actionLabel = ctaLabel ?? site.ctaLabel;

  if (paper) {
    return (
      <footer className="relative overflow-hidden border-t border-ink/8 bg-white text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 100%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 42%), radial-gradient(ellipse at 90% 0%, color-mix(in srgb, var(--glow) 12%, transparent), transparent 40%)",
          }}
        />
        <div className="chrome-frame relative py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Logo name={site.name} className="text-ink" />
            <a href={actionHref} className={`${btnPrimary} w-full sm:w-auto`}>
              {actionLabel}
            </a>
          </div>
          <FooterFacts paper />

          <FooterBar
            links={links}
            siteName={site.name}
            staffHref={staffHref}
            staffLabel={staffLabel}
            paper
          />
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-glow/14 blur-3xl" />
      </div>
      <div className="chrome-frame relative py-16 sm:py-24">
        <div>
          <Logo name={site.name} inverted className="text-paper" />
          <p className="mt-6 max-w-sm text-sm leading-6 text-paper/60">
            Personal, nómina y cumplimiento para obras y plantas.
          </p>
        </div>
        <FooterFacts />

        <FooterBar
          links={links}
          siteName={site.name}
          staffHref={staffHref}
          staffLabel={staffLabel}
        />
      </div>
    </footer>
  );
}

function FooterFacts({ paper = false }: { paper?: boolean }) {
  const label = paper
    ? "text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
    : "text-[11px] font-medium uppercase tracking-[0.22em] text-glow";
  const value = paper ? "text-sm leading-6 text-ink" : "text-sm leading-6 text-paper";
  const hover = paper ? "hover:text-accent" : "hover:text-glow";
  const email = paper ? COMPANY_INFO.emailReclutamiento : COMPANY_INFO.email;
  const phones = paper
    ? [{ href: COMPANY_INFO.social.whatsapp, text: COMPANY_INFO.telefono, external: true }]
    : [
        { href: COMPANY_INFO.social.whatsapp, text: COMPANY_INFO.telefono, external: true },
        {
          href: `tel:+1${COMPANY_INFO.telefonoAlt.replace(/-/g, "")}`,
          text: COMPANY_INFO.telefonoAlt,
          external: false,
        },
      ];

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className={label}>Dirección</p>
        <p className={`mt-3 ${value}`}>{COMPANY_INFO.ubicacion}</p>
      </div>
      <div>
        <p className={label}>WhatsApp</p>
        <ul className={`mt-3 space-y-1 ${value}`}>
          {phones.map((phone) => (
            <li key={phone.text}>
              <a
                href={phone.href}
                {...(phone.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={hover}
              >
                {phone.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={label}>Correo</p>
        <a href={`mailto:${email}`} className={`mt-3 block break-all ${value} ${hover}`}>
          {email}
        </a>
      </div>
      <div>
        <p className={label}>Redes</p>
        <ul className={`mt-3 space-y-1 ${value}`}>
          <li>
            <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noreferrer" className={hover}>
              Instagram @hakamord
            </a>
          </li>
          <li>
            <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noreferrer" className={hover}>
              LinkedIn · Hakamo
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function FooterBar({
  links,
  siteName,
  staffHref,
  staffLabel,
  paper = false,
}: {
  links: NavLink[];
  siteName: string;
  staffHref: string;
  staffLabel: string;
  paper?: boolean;
}) {
  const line = paper ? "border-ink/8 text-muted" : "border-white/10 text-paper/45";
  const hover = paper ? "hover:text-accent" : "hover:text-glow";

  return (
    <div className={`mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${line}`}>
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={hover}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span>
          © {new Date().getFullYear()} {siteName}
        </span>
        <Link href="/privacidad" className={hover}>
          Privacidad
        </Link>
        <Link href={staffHref} className={hover}>
          {staffLabel}
        </Link>
      </div>
    </div>
  );
}
