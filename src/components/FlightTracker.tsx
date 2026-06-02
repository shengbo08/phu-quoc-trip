import { ExternalLink, PlaneTakeoff } from 'lucide-react';
import type { FlightTrack } from '../data/trip';
import { EmptyState } from './EmptyState';

interface FlightTrackerProps {
  flights: FlightTrack[];
}

export function FlightTracker({ flights }: FlightTrackerProps) {
  if (flights.length === 0) return <EmptyState />;

  return (
    <div>
      <h3 className="mb-3 text-xl font-bold text-stone-950">航班追蹤</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {flights.map((flight) => (
          <article key={flight.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-sky-50 p-3 text-sky-700">
                <PlaneTakeoff className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-sky-700">{flight.direction}</p>
                <h4 className="text-lg font-bold text-stone-950">
                  {flight.airline} {flight.flightNumber}
                </h4>
              </div>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-stone-50 p-3">
                <p className="font-semibold text-stone-800">起飛</p>
                <p className="mt-1 text-stone-600">{flight.from}</p>
                <p className="mt-1 text-stone-500">{flight.departureTime}</p>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <p className="font-semibold text-stone-800">抵達</p>
                <p className="mt-1 text-stone-600">{flight.to}</p>
                <p className="mt-1 text-stone-500">{flight.arrivalTime}</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-stone-600">航廈：{flight.terminal ?? '尚未填寫'}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <FlightLink href={flight.flightRadarUrl} label="FlightRadar24" />
              <FlightLink href={flight.flightAwareUrl} label="FlightAware" />
              <FlightLink href={flight.airportUrl} label="機場官網" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FlightLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex items-center gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-200"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
