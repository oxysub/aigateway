import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
