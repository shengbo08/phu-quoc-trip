import { ExternalLink, MapPinned, Navigation } from 'lucide-react';
import type { MapPlace } from '../data/trip';
import { EmptyState } from './EmptyState';

interface MapCollectionProps {
  places: MapPlace[];
  collectionUrl?: string;
}

export function MapCollection({ places, collectionUrl }: MapCollectionProps) {
  if (places.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {collectionUrl ? (
        <a
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
          href={collectionUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MapPinned className="h-4 w-4" aria-hidden="true" />
          一鍵開啟全部景點地圖
        </a>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {places.map((place) => (
          <article key={place.id} className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              {place.category}
            </p>
            <h3 className="mt-1 text-lg font-bold text-stone-950">{place.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-200"
                href={place.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Maps
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  place.name,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                導航
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
