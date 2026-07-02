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
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-sm font-semibold text-teal-700">Day {day.day}</p>
        <h3 className="text-2xl font-black leading-tight text-stone-950">{day.city}</h3>
        <p className="text-sm text-stone-500">{formatDate(day.date)}</p>
      </div>

      <WeatherSummary dayNumber={day.day} weather={weather} />

      {day.activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 space-y-3">
          {day.activities.map((activity) => (
            <article
              key={activity.id}
              className="rounded-lg border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex gap-3">
                <div className="flex shrink-0 flex-col items-center">
                  <span className="rounded-full bg-teal-700 p-2 text-white">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="mt-2 h-full w-px bg-stone-200" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-2 inline-flex rounded-md bg-white px-3 py-1 text-sm font-bold text-stone-700">
                    {valueOrEmpty(activity.time)}
                  </p>
                  <ActivityPlaceTitle place={activity.place} />
                  <p className="mt-2 leading-7 text-stone-700">{activity.activity}</p>
                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    地址：{valueOrEmpty(activity.address)}
                  </p>

                  <div className="mt-4">
                    <MapButton url={activity.googleMapsUrl} />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm">
                    <DetailPill
                      icon={<Navigation className="h-4 w-4" />}
                      label="交通"
                      value={valueOrEmpty(activity.transport)}
                    />
                    <DetailPill
                      icon={<CreditCard className="h-4 w-4" />}
                      label="預估費用"
                      value={formatMoney(activity.estimatedCost)}
                    />
                    <DetailPill
                      icon={<StickyNote className="h-4 w-4" />}
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
      <div className="rounded-lg border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-stone-600">
        Day {dayNumber} 天氣資料載入中，出門前再確認一次。
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-sky-100 bg-sky-50 p-3">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{weather.icon}</div>
        <div className="min-w-0">
          <p className="font-bold text-stone-950">{weather.description}</p>
          <p className="mt-1 text-sm leading-6 text-stone-700">
            高溫 {weather.maxTemperature}°C / 低溫 {weather.minTemperature}°C / 降雨{' '}
            {weather.precipitationProbability}%
          </p>
        </div>
      </div>
      {weather.precipitationProbability >= 70 ? (
        <p className="mt-2 rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900">
          降雨機率偏高，建議準備雨具並保留室內備案。
        </p>
      ) : null}
    </div>
  );
}

function ActivityPlaceTitle({ place }: { place: string }) {
  const hotel = hotelDisplayNames[place];

  if (!hotel) {
    return <h4 className="text-xl font-black leading-tight text-stone-950">{place}</h4>;
  }

  return (
    <div>
      <h4 className="text-xl font-black leading-tight text-stone-950">{hotel.zh}</h4>
      <p className="mt-1 text-sm font-semibold leading-6 text-stone-500">{hotel.en}</p>
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
    <div className="rounded-lg bg-white p-3">
      <p className="mb-1 flex items-center gap-2 font-semibold text-stone-800">
        <span className="text-teal-700">{icon}</span>
        {label}
      </p>
      <p className="leading-6 text-stone-600">{value}</p>
    </div>
  );
}
