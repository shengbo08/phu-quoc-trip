import { CalendarDays, MapPin, Users } from 'lucide-react';
import type { TripData } from '../data/trip';
import { formatDate } from '../utils/format';

interface HeroProps {
  trip: TripData;
}

export function Hero({ trip }: HeroProps) {
  return (
    <header className="relative min-h-[620px] overflow-hidden bg-stone-950 text-white">
      <img
        src={trip.coverImageUrl}
        alt={trip.destination}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/35 via-stone-950/30 to-stone-950/80" />

      <nav className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a className="w-fit text-sm font-semibold tracking-wide" href="#top">
          Travel Plan
        </a>
        <div className="-mx-1 flex max-w-full gap-1 overflow-x-auto px-1 text-sm text-white/90 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-end sm:gap-2 sm:overflow-visible sm:px-0">
          <NavLink href="#live" label="即時" />
          <NavLink href="#overview" label="總覽" />
          <NavLink href="#details" label="行程" />
          <NavLink href="#transport" label="航班" />
          <NavLink href="#stays" label="住宿" />
          <NavLink href="#food" label="美食推薦" />
          <NavLink href="#emergency" label="緊急" />
        </div>
      </nav>

      <div
        id="top"
        className="relative z-10 mx-auto flex min-h-[500px] max-w-6xl flex-col justify-end px-4 pb-16 pt-20 sm:px-6 lg:pb-20"
      >
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-medium backdrop-blur">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {trip.destination}
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
          {trip.name}
        </h1>
        <p className="mt-5 w-full max-w-[calc(100vw-2rem)] break-words text-base leading-8 text-white/88 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg">
          {trip.intro}
        </p>
        <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg bg-white/12 p-4 backdrop-blur">
            <CalendarDays className="mt-0.5 h-5 w-5 text-teal-100" aria-hidden="true" />
            <div>
              <p className="font-semibold">旅行日期</p>
              <p className="mt-1 text-white/82">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-white/12 p-4 backdrop-blur sm:col-span-2 lg:col-span-2">
            <Users className="mt-0.5 h-5 w-5 text-teal-100" aria-hidden="true" />
            <div>
              <p className="font-semibold">旅伴費用備註</p>
              <p className="mt-1 text-white/82">{trip.companionsNote || '尚未提供'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="shrink-0 rounded-md px-2.5 py-2 transition hover:bg-white/15 sm:px-3" href={href}>
      {label}
    </a>
  );
}
