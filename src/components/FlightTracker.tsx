import { ExternalLink, PlaneLanding, PlaneTakeoff, Ticket } from 'lucide-react';
import type { FlightTrack } from '../data/trip';
import { EmptyState } from './EmptyState';

interface FlightTrackerProps {
  flights: FlightTrack[];
  ticketNotes?: string[];
}

export function FlightTracker({ flights, ticketNotes = [] }: FlightTrackerProps) {
  if (flights.length === 0) return <EmptyState />;

  const outboundFlights = flights.filter((flight) => flight.direction === '去程');
  const returnFlights = flights.filter((flight) => flight.direction === '回程');

  return (
    <div className="space-y-6">
      <FlightGroup title="去程" flights={outboundFlights} icon="takeoff" />
      <FlightGroup title="回程" flights={returnFlights} icon="landing" />

      <div>
        <h3 className="mb-3 text-xl font-bold text-stone-950">航班追蹤</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <TrackerLink href="https://www.flightradar24.com/" label="FlightRadar24" />
          <TrackerLink href="https://www.flightaware.com/live/" label="FlightAware" />
          <TrackerLink href="https://www.kia.gov.tw/" label="機場官網查詢" />
        </div>
      </div>

      {ticketNotes.length > 0 ? (
        <div>
          <h3 className="mb-3 text-xl font-bold text-stone-950">票券備註</h3>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-center gap-2 font-bold text-amber-900">
              <Ticket className="h-5 w-5" aria-hidden="true" />
              電子票券與接送資訊
            </div>
            <ul className="space-y-2 text-sm leading-6 text-stone-700">
              {ticketNotes.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FlightGroup({
  title,
  flights,
  icon,
}: {
  title: string;
  flights: FlightTrack[];
  icon: 'takeoff' | 'landing';
}) {
  const Icon = icon === 'takeoff' ? PlaneTakeoff : PlaneLanding;

  return (
    <div>
      <h3 className="mb-3 text-xl font-bold text-stone-950">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {flights.map((flight) => (
          <article
            key={flight.id}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-sky-50 p-3 text-sky-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-sky-700">{flight.airline}</p>
                <h4 className="text-lg font-bold text-stone-950">{flight.flightNumber}</h4>
              </div>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <InfoBox label="起飛時間" place={flight.from} value={flight.departureTime} />
              <InfoBox label="抵達時間" place={flight.to} value={flight.arrivalTime} />
            </div>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              <span className="font-semibold text-stone-800">航廈資訊：</span>
              {flight.terminal ?? '請以機場當日資訊為準'}
            </p>

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

function InfoBox({ label, place, value }: { label: string; place: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <p className="font-semibold text-stone-800">{label}</p>
      <p className="mt-1 text-stone-600">{place}</p>
      <p className="mt-1 text-stone-500">{value}</p>
    </div>
  );
}

function FlightLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex items-center gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-200"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

function TrackerLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
