import { ContactForm } from "@/components/ui/ContactForm";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";

const phoneHref = `tel:${COMPANY.phone.replace(/\s/g, "")}`;

type CtaProps = {
  id?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
};

export function Cta({
  id = "contact",
  title = "Discuss Your Operational Requirements",
  description = "Tell us about your facility, operational priorities and technology landscape. Our team will respond to scope a relevant discussion.",
  submitLabel = "Submit Enquiry",
  className = "pb-28",
}: CtaProps) {
  return (
    <Section id={id} className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-8 backdrop-blur-sm lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8">
            <ContactForm submitLabel={submitLabel} />
          </div>

          <address className="mx-auto mt-8 max-w-md space-y-1 text-center not-italic text-sm text-muted">
            <p className="font-medium text-foreground">{COMPANY.legalName}</p>
            {COMPANY.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a
              href={phoneHref}
              className="inline-block pt-1 text-accent transition-colors hover:text-accent-light"
            >
              {COMPANY.phoneLabel}
            </a>
          </address>
        </div>
      </div>
    </Section>
  );
}
