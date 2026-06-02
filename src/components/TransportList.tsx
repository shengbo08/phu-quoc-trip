import { Bus, Car, Plane, Train, Route } from 'lucide-react';
import type { TransportInfo, TransportType } from '../data/trip';
import { transportTypeLabels, valueOrEmpty } from '../utils/format';
import { EmptyState } from './EmptyState';

const iconMap: Record<TransportType, typeof Plane> = {
  flight: Plane,
  train: Train,
  bus: Bus,
  car: Car,
  other: Route,
};

interface TransportListProps {
  transports: TransportInfo[];
}

export function TransportList({ transports }: TransportListProps) {
  if (transports.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {transports.map((transport) => {
        const Icon = iconMap[transport.type];

        return (
          <article
            key={transport.id}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-teal-50 p-3 text-teal-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-teal-700">
                  {transportTypeLabels[transport.type]}
                </p>
                <h3 className="mt-1 text-lg font-bold text-stone-950">
                  {transport.title}
                </h3>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-stone-50 p-3">
                <p className="font-semibold text-stone-800">出發</p>
                <p className="mt-1 text-stone-600">{valueOrEmpty(transport.from)}</p>
                <p className="mt-1 text-stone-500">{valueOrEmpty(transport.departureTime)}</p>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <p className="font-semibold text-stone-800">抵達</p>
                <p className="mt-1 text-stone-600">{valueOrEmpty(transport.to)}</p>
                <p className="mt-1 text-stone-500">{valueOrEmpty(transport.arrivalTime)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone-600">
              票券備註：{valueOrEmpty(transport.ticketNote)}
            </p>
          </article>
        );
      })}
    </div>
  );
}
