import { CalendarDays, MapPin, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TripData } from '../data/trip';
import { formatDate } from '../utils/format';

interface HeroProps {
  trip: TripData;
}

export function Hero({ trip }: HeroProps) {
  return (
    <header className="relative min-h-[440px] overflow-hidden bg-stone-950 text-white sm:min-h-[580px]">
      <img
        src={trip.coverImageUrl}
        alt={trip.destination}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/35 to-stone-950/85" />

      <nav className="relative z-10 mx-auto max-w-6xl px-2.5 py-3 sm:px-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <a className="shrink-0 text-sm font-semibold tracking-wide" href="#top">
            Phu Quoc
          </a>
        </div>
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-xs text-white/90 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-end sm:overflow-visible sm:text-sm">
          <NavLink href="#live" label="即時" />
          <NavLink href="#overview" label="總覽" />
          <NavLink href="#details" label="行程" />
          <NavLink href="#transport" label="航班" />
          <NavLink href="#stays" label="住宿" />
          <NavLink href="#emergency" label="緊急" />
        </div>
      </nav>

      <div
        id="top"
        className="relative z-10 mx-auto flex min-h-[315px] max-w-6xl flex-col justify-end px-2.5 pb-6 pt-8 sm:min-h-[470px] sm:px-6 sm:pb-14"
      >
        <p className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1.5 text-xs font-medium backdrop-blur sm:text-sm">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {trip.destination}
        </p>
        <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
          {trip.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:mt-4 sm:text-base">
          {trip.intro}
        </p>

        <div className="mt-4 grid gap-2 text-xs sm:mt-6 sm:grid-cols-2 sm:text-sm">
          <HeroFact icon={<CalendarDays className="h-4 w-4" />} label="旅行日期">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </HeroFact>
          <HeroFact icon={<Users className="h-4 w-4" />} label="旅伴費用備註">
            {trip.companionsNote || '尚未提供'}
          </HeroFact>
        </div>
      </div>
    </header>
  );
}

function HeroFact({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-white/12 p-2.5 backdrop-blur sm:p-3">
      <span className="mt-0.5 shrink-0 text-teal-100">{icon}</span>
      <div className="min-w-0">
        <p className="font-semibold">{label}</p>
        <p className="mt-0.5 break-words text-white/82">{children}</p>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="shrink-0 rounded-md bg-white/10 px-2.5 py-1.5 font-semibold transition hover:bg-white/15 sm:bg-transparent sm:px-3 sm:py-2"
      href={href}
    >
      {label}
    </a>
  );
}
