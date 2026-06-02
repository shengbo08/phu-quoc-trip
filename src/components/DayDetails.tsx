import { Clock, CreditCard, Navigation, StickyNote } from 'lucide-react';
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
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700">Day {day.day}</p>
          <h3 className="mt-1 text-2xl font-bold text-stone-950">{day.city}</h3>
        </div>
        <p className="text-sm text-stone-500">{formatDate(day.date)}</p>
      </div>

      <div className="mb-5 rounded-lg border border-sky-100 bg-sky-50 p-4">
        {weather ? (
          <div className="grid gap-3 text-sm sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="text-4xl">{weather.icon}</div>
            <div>
              <p className="font-bold text-stone-950">
                Day {day.day} 天氣：{weather.description}
              </p>
              <p className="mt-1 text-stone-700">
                最高 {weather.maxTemperature}°C / 最低 {weather.minTemperature}°C / 降雨機率{' '}
                {weather.precipitationProbability}%
              </p>
              {weather.precipitationProbability >= 70 ? (
                <p className="mt-2 rounded-md bg-amber-100 px-3 py-2 font-semibold text-amber-900">
                  提醒：可能有明顯降雨，建議把戶外行程排在上午，並準備雨具。
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone-600">
            Day {day.day} 天氣：尚未有預報。接近出發日後會自動顯示最高溫、最低溫與降雨機率。
          </p>
        )}
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
                  <ActivityPlaceTitle place={activity.place} />
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

function ActivityPlaceTitle({ place }: { place: string }) {
  const hotel = hotelDisplayNames[place];

  if (!hotel) {
    return <h4 className="text-xl font-bold text-stone-950">{place}</h4>;
  }

  return (
    <div>
      <h4 className="text-xl font-black text-stone-950">{hotel.zh}</h4>
      <p className="mt-1 text-sm font-semibold text-stone-500">{hotel.en}</p>
    </div>
  );
}
