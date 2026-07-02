import { MapPinned } from 'lucide-react';

interface MapButtonProps {
  url?: string;
}

export function MapButton({ url }: MapButtonProps) {
  if (!url) {
    return (
      <span className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-md bg-stone-100 px-2 py-1.5 text-xs font-medium text-stone-500 sm:w-auto">
        <MapPinned className="h-3.5 w-3.5" aria-hidden="true" />
        尚未提供
      </span>
    );
  }

  return (
    <a
      className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-md bg-teal-700 px-2 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <MapPinned className="h-3.5 w-3.5" aria-hidden="true" />
      Google Maps
    </a>
  );
}
