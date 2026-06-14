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
    <footer className="border-t border-gray-200 bg-white py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className="max-w-xs text-sm leading-relaxed text-gray-600">
              {COMPANY.tagline}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              {CREDENTIALS.map((c) => c.label).join(" · ")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <span
                      aria-hidden
                      className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-accent"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Solutions
            </h3>
            <ul className="space-y-2">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <span
                      aria-hidden
                      className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-accent"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Contact
            </h3>
            <address className="not-italic">
              <p className="text-sm font-medium text-gray-900">
                {COMPANY.legalName}
              </p>
              <div className="mt-2 space-y-0.5">
                {COMPANY.address.map((line) => (
                  <p key={line} className="text-sm leading-snug text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-sm leading-snug text-gray-600 transition-colors hover:text-accent"
              >
                {COMPANY.phoneLabel}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          &copy; {year} {COMPANY.legalName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
