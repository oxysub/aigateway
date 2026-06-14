"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          <Logo />

          <div className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/#contact"
              variant="primary"
              className="hidden sm:inline-flex"
            >
              Contact Us
            </Button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-muted transition-colors hover:border-accent/40 hover:text-foreground xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </Container>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-background/95 backdrop-blur-xl xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-2">
              <Button
                href="/#contact"
                variant="primary"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
