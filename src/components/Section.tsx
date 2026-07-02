import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="min-w-0 scroll-mt-20 py-4 sm:py-8">
      <div className="mb-3 sm:mb-4">
        {eyebrow ? (
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-black leading-tight text-stone-950 sm:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
