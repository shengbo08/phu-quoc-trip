import { useState } from 'react';
import { CalendarCheck, X } from 'lucide-react';
import type { Accommodation } from '../data/trip';
import { formatDate, valueOrEmpty } from '../utils/format';
import { EmptyState } from './EmptyState';
import { MapButton } from './MapButton';

interface AccommodationListProps {
  accommodations: Accommodation[];
}

export function AccommodationList({ accommodations }: AccommodationListProps) {
  const [previewHotel, setPreviewHotel] = useState<Accommodation | null>(null);

  if (accommodations.length === 0) return <EmptyState />;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {accommodations.map((hotel) => (
          <article
            key={hotel.id}
            className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {hotel.photoUrl ? (
              <button
                type="button"
                className="block w-full bg-stone-100 text-left"
                onClick={() => setPreviewHotel(hotel)}
                aria-label={`放大檢視 ${hotel.hotelNameZh ?? hotel.hotelName} 照片`}
              >
                <img
                  src={hotel.photoUrl}
                  alt={hotel.hotelNameZh ?? hotel.hotelName}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
              </button>
            ) : null}

            <div className="p-5">
              <h3 className="text-xl font-black leading-tight text-stone-950">
                {hotel.hotelNameZh ?? hotel.hotelName}
              </h3>
              <p className="mt-1 text-sm font-semibold leading-6 text-stone-500">
                {hotel.hotelNameEn ?? hotel.hotelName}
              </p>

              <p className="mt-4 flex items-start gap-2 text-sm text-stone-600">
                <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                {formatDate(hotel.checkIn)} - {formatDate(hotel.checkOut)}
              </p>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-stone-800">地址</dt>
                  <dd className="mt-1 leading-6 text-stone-600">{valueOrEmpty(hotel.address)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-800">訂房資訊</dt>
                  <dd className="mt-1 leading-6 text-stone-600">
                    {valueOrEmpty(hotel.bookingInfo)}
                  </dd>
                </div>
              </dl>

              <div className="mt-5">
                <MapButton url={hotel.googleMapsUrl} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {previewHotel?.photoUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewHotel(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-stone-900 shadow-sm transition hover:bg-white"
              onClick={() => setPreviewHotel(null)}
              aria-label="關閉照片預覽"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={previewHotel.photoUrl}
              alt={previewHotel.hotelNameZh ?? previewHotel.hotelName}
              className="max-h-[82vh] w-full rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-3 text-center text-white">
              <p className="text-lg font-bold">{previewHotel.hotelNameZh ?? previewHotel.hotelName}</p>
              <p className="text-sm text-white/75">{previewHotel.hotelNameEn ?? previewHotel.hotelName}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
