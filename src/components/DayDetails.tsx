import { Clock, CreditCard, Navigation, StickyNote } from 'lucide-react';
import type { TripDay } from '../data/trip';
import { formatDate, formatMoney, valueOrEmpty } from '../utils/format';
import { EmptyState } from './EmptyState';
import { MapButton } from './MapButton';

interface DayDetailsProps {
  day?: TripDay;
}

export function DayDetails({ day }: DayDetailsProps) {
  if (!day) return <EmptyState label="請先選擇日期" />;

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700">Day {day.day}</p>
          <h3 className="mt-1 text-2xl font-bold text-stone-950">{day.city}</h3>
        </div>
        <p className="text-sm text-stone-500">{formatDate(day.date)}</p>
      </div>

      {day.activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {day.activities.map((activity) => (
            <article
              key={activity.id}
              className="rounded-lg border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm font-semibold text-stone-700">
                    <Clock className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    {valueOrEmpty(activity.time)}
                  </p>
                  <h4 className="text-xl font-bold text-stone-950">{activity.place}</h4>
                  <p className="mt-2 leading-7 text-stone-700">{activity.activity}</p>
                  <p className="mt-3 text-sm text-stone-500">
                    地址：{valueOrEmpty(activity.address)}
                  </p>
                </div>
                <MapButton url={activity.googleMapsUrl} />
              </div>

              <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="mb-1 flex items-center gap-2 font-semibold text-stone-800">
                    <Navigation className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    交通
                  </p>
                  <p className="text-stone-600">{valueOrEmpty(activity.transport)}</p>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="mb-1 flex items-center gap-2 font-semibold text-stone-800">
                    <CreditCard className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    預估花費
                  </p>
                  <p className="text-stone-600">{formatMoney(activity.estimatedCost)}</p>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="mb-1 flex items-center gap-2 font-semibold text-stone-800">
                    <StickyNote className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    備註
                  </p>
                  <p className="text-stone-600">{valueOrEmpty(activity.note)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
