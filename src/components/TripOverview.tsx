import { Calendar, MapPin } from 'lucide-react';
import type { TripDay } from '../data/trip';
import { formatDate } from '../utils/format';
import { EmptyState } from './EmptyState';

interface TripOverviewProps {
  days: TripDay[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
}

export function TripOverview({ days, selectedDayId, onSelectDay }: TripOverviewProps) {
  if (days.length === 0) return <EmptyState />;

  return (
    <div className="-mx-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
      <div className="flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {days.map((day) => {
          const isSelected = day.id === selectedDayId;

          return (
            <button
              key={day.id}
              className={`min-w-[220px] rounded-lg border p-4 text-left shadow-sm transition sm:min-w-0 ${
                isSelected
                  ? 'border-teal-700 bg-teal-700 text-white shadow-soft'
                  : 'border-stone-200 bg-white text-stone-800 hover:-translate-y-0.5 hover:border-teal-300'
              }`}
              type="button"
              onClick={() => onSelectDay(day.id)}
            >
              <span
                className={`mb-3 inline-flex rounded-md px-3 py-1 text-sm font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}
              >
                Day {day.day}
              </span>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {formatDate(day.date)}
                </p>
                <p className="flex items-start gap-2 font-semibold leading-6">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{day.city}</span>
                </p>
                <p className="line-clamp-2 text-sm leading-6 opacity-90">
                  {day.highlights.join(' / ') || '尚未提供'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
