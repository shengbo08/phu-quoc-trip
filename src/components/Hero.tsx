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

      <nav className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <a className="text-sm font-semibold tracking-wide" href="#top">
          Travel Plan
        </a>
        <div className="flex flex-wrap gap-2 text-sm text-white/90">
          <a className="rounded-md px-3 py-2 transition hover:bg-white/15" href="#live">
            即時
          </a>
          <a className="rounded-md px-3 py-2 transition hover:bg-white/15" href="#overview">
            總覽
          </a>
          <a className="rounded-md px-3 py-2 transition hover:bg-white/15" href="#details">
            詳細
          </a>
          <a className="rounded-md px-3 py-2 transition hover:bg-white/15" href="#maps">
            地圖
          </a>
          <a className="rounded-md px-3 py-2 transition hover:bg-white/15" href="#emergency">
            緊急
          </a>
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
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/88 sm:text-lg">
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
              <p className="font-semibold">旅伴與備註</p>
              <p className="mt-1 text-white/82">{trip.companionsNote || '尚未填寫'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
