import { BedDouble, CalendarCheck } from 'lucide-react';
import type { Accommodation } from '../data/trip';
import { formatDate, valueOrEmpty } from '../utils/format';
import { EmptyState } from './EmptyState';
import { MapButton } from './MapButton';

interface AccommodationListProps {
  accommodations: Accommodation[];
}

export function AccommodationList({ accommodations }: AccommodationListProps) {
  if (accommodations.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {accommodations.map((hotel) => (
        <article
          key={hotel.id}
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
        >
          <BedDouble className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
          <h3 className="text-lg font-bold text-stone-950">{hotel.hotelName}</h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-stone-600">
            <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            {formatDate(hotel.checkIn)} - {formatDate(hotel.checkOut)}
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-stone-800">地址</dt>
              <dd className="mt-1 text-stone-600">{valueOrEmpty(hotel.address)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-stone-800">訂房資訊</dt>
              <dd className="mt-1 text-stone-600">{valueOrEmpty(hotel.bookingInfo)}</dd>
            </div>
          </dl>
          <div className="mt-5">
            <MapButton url={hotel.googleMapsUrl} />
          </div>
        </article>
      ))}
    </div>
  );
}
