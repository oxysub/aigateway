import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { COMPANY, CREDENTIALS, NAV_LINKS } from "@/lib/constants";

const SOLUTION_LINKS = [
  { label: "Oil & Gas", href: "/oil-gas" },
  { label: "Staff Augmentation", href: "/staff-augmentation" },
  { label: "Training", href: "/training" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-surface py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {COMPANY.tagline}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted/80">
              {CREDENTIALS.map((c) => c.label).join(" · ")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Solutions
            </h3>
            <ul className="space-y-2">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Contact
            </h3>
            <address className="space-y-3 not-italic">
              {COMPANY.address.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </p>
              ))}
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="block text-sm text-muted transition-colors hover:text-foreground"
              >
                {COMPANY.phoneLabel}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-muted">
          &copy; {year} {COMPANY.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
