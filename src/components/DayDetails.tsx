import { Clock, CreditCard, Navigation, StickyNote } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TripDay } from '../data/trip';
import { formatDate, formatMoney, valueOrEmpty } from '../utils/format';
import type { DailyWeather } from '../utils/weather';
import { EmptyState } from './EmptyState';
import { MapButton } from './MapButton';

interface DayDetailsProps {
  day?: TripDay;
  weather?: DailyWeather;
}

const hotelDisplayNames: Record<string, { zh: string; en: string }> = {
  'Rosie Hillside Seaview Phu Quoc Apartment': {
    zh: '富國島 Rosie 山坡海景公寓',
    en: 'Rosie Hillside Seaview Phu Quoc Apartment',
  },
  'Grand Resort Ocean Bay Phu Quoc': {
    zh: '富國島海灣大度假村',
    en: 'Grand Resort Ocean Bay Phu Quoc',
  },
  'Wyndham Grand Phu Quoc': {
    zh: '富國島溫德姆至尊飯店',
    en: 'Wyndham Grand Phu Quoc',
  },
};

export function DayDetails({ day, weather }: DayDetailsProps) {
  if (!day) return <EmptyState label="請先選擇日期" />;

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-soft sm:p-5">
      <div className="mb-3 flex flex-col gap-0.5">
        <p className="text-xs font-semibold text-teal-700">Day {day.day}</p>
        <h3 className="text-xl font-black leading-tight text-stone-950">{day.city}</h3>
        <p className="text-xs text-stone-500">{formatDate(day.date)}</p>
      </div>

      <WeatherSummary dayNumber={day.day} weather={weather} />

      {day.activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-3 space-y-2">
          {day.activities.map((activity) => (
            <article
              key={activity.id}
              className="rounded-lg border border-stone-200 bg-stone-50 p-3"
            >
              <div className="flex gap-2.5">
                <div className="flex shrink-0 flex-col items-center">
                  <span className="rounded-full bg-teal-700 p-1.5 text-white">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 h-full w-px bg-stone-200" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1.5 inline-flex rounded-md bg-white px-2 py-0.5 text-xs font-bold text-stone-700">
                    {valueOrEmpty(activity.time)}
                  </p>
                  <ActivityPlaceTitle place={activity.place} />
                  <p className="mt-1.5 text-sm leading-6 text-stone-700">{activity.activity}</p>
                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    地址：{valueOrEmpty(activity.address)}
                  </p>

                  <div className="mt-2.5">
                    <MapButton url={activity.googleMapsUrl} />
                  </div>

                  <div className="mt-2.5 grid gap-1.5 text-xs">
                    <DetailPill
                      icon={<Navigation className="h-3.5 w-3.5" />}
                      label="交通"
                      value={valueOrEmpty(activity.transport)}
                    />
                    <DetailPill
                      icon={<CreditCard className="h-3.5 w-3.5" />}
                      label="預估費用"
                      value={formatMoney(activity.estimatedCost)}
                    />
                    <DetailPill
                      icon={<StickyNote className="h-3.5 w-3.5" />}
                      label="備註"
                      value={valueOrEmpty(activity.note)}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherSummary({ dayNumber, weather }: { dayNumber: number; weather?: DailyWeather }) {
  if (!weather) {
    return (
      <div className="rounded-lg border border-sky-100 bg-sky-50 p-2.5 text-xs leading-5 text-stone-600">
        Day {dayNumber} 天氣資料載入中，出門前再確認一次。
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-sky-100 bg-sky-50 p-2.5">
      <div className="flex items-center gap-2.5">
        <div className="text-2xl">{weather.icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-stone-950">{weather.description}</p>
          <p className="mt-0.5 text-xs leading-5 text-stone-700">
            高 {weather.maxTemperature}°C / 低 {weather.minTemperature}°C / 降雨{' '}
            {weather.precipitationProbability}%
          </p>
        </div>
      </div>
      {weather.precipitationProbability >= 70 ? (
        <p className="mt-1.5 rounded-md bg-amber-100 px-2 py-1.5 text-xs font-semibold text-amber-900">
          降雨機率偏高，建議準備雨具。
        </p>
      ) : null}
    </div>
  );
}

function ActivityPlaceTitle({ place }: { place: string }) {
  const hotel = hotelDisplayNames[place];

  if (!hotel) {
    return <h4 className="text-base font-black leading-tight text-stone-950">{place}</h4>;
  }

  return (
    <div>
      <h4 className="text-base font-black leading-tight text-stone-950">{hotel.zh}</h4>
      <p className="mt-0.5 text-xs font-semibold leading-5 text-stone-500">{hotel.en}</p>
    </div>
  );
}

function DetailPill({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md bg-white p-2">
      <p className="mb-0.5 flex items-center gap-1.5 font-semibold text-stone-800">
        <span className="text-teal-700">{icon}</span>
        {label}
      </p>
      <p className="leading-5 text-stone-600">{value}</p>
    </div>
  );
}
