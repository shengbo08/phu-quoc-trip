import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="min-w-0 scroll-mt-24 py-6 sm:py-10">
      <div className="mb-4 sm:mb-5">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black leading-tight text-stone-950 sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
