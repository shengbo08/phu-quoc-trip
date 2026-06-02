import { useEffect, useState } from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { fetchPhuQuocWeather, type CurrentWeather, type DailyWeather } from '../utils/weather';

interface WeatherCardProps {
  onDailyWeatherChange?: (daily: DailyWeather[]) => void;
}

export function WeatherCard({ onDailyWeatherChange }: WeatherCardProps) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [sourceState, setSourceState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setSourceState('loading');

      try {
        const result = await fetchPhuQuocWeather();

        if (!isMounted) return;

        setWeather(result.current);
        setSourceState('ready');
        onDailyWeatherChange?.(result.daily);
      } catch (error) {
        console.warn(error);

        if (!isMounted) return;

        setSourceState('error');
      }
    }

    loadWeather();
    const intervalId = window.setInterval(loadWeather, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [onDailyWeatherChange]);

  return (
    <article className="min-w-0 rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-sky-50 p-3 text-sky-700">
            <CloudSun className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-sky-700">富國島目前天氣</p>
            <h3 className="text-xl font-bold text-stone-950">
              {weather ? `${weather.icon} ${weather.description}` : '讀取中'}
            </h3>
          </div>
        </div>
        <RefreshCw
          className={`h-4 w-4 text-stone-400 ${sourceState === 'loading' ? 'animate-spin' : ''}`}
        />
      </div>

      {sourceState === 'error' ? (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          目前無法取得即時天氣，稍後會自動重試。
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <WeatherMetric label="溫度" value={weather ? `${weather.temperature}°C` : '--'} />
          <WeatherMetric
            label="體感"
            value={weather ? `${weather.apparentTemperature}°C` : '--'}
          />
          <WeatherMetric
            label="降雨機率"
            value={weather ? `${weather.precipitationProbability}%` : '--'}
          />
          <WeatherMetric label="濕度" value={weather ? `${weather.humidity}%` : '--'} />
          <WeatherMetric label="風速" value={weather ? `${weather.windSpeed} km/h` : '--'} />
          <WeatherMetric
            label="更新"
            value={weather ? new Date(weather.updatedAt).toLocaleTimeString('zh-TW') : '--'}
          />
        </div>
      )}
    </article>
  );
}

function WeatherMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <p className="text-xs font-semibold text-stone-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-stone-950">{value}</p>
    </div>
  );
}
