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
    <div className="-mx-2.5 overflow-x-auto px-2.5 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
      <div className="flex gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-6">
        {days.map((day) => {
          const isSelected = day.id === selectedDayId;

          return (
            <button
              key={day.id}
              className={`min-w-[168px] rounded-lg border p-2.5 text-left text-xs shadow-sm transition sm:min-w-0 ${
                isSelected
                  ? 'border-teal-700 bg-teal-700 text-white shadow-soft'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-teal-300'
              }`}
              type="button"
              onClick={() => onSelectDay(day.id)}
            >
              <span
                className={`mb-2 inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}
              >
                Day {day.day}
              </span>
              <div className="space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {formatDate(day.date)}
                </p>
                <p className="flex items-start gap-1.5 font-semibold leading-5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{day.city}</span>
                </p>
                <p className="line-clamp-2 leading-5 opacity-90">
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
