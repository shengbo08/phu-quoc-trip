import { useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { fetchLiveExchangeRates, type LiveExchangeRates } from '../utils/liveExchange';

const quickVndAmounts = [100000, 500000, 1000000, 2000000];

export function ExchangeRateCard() {
  const [rates, setRates] = useState<LiveExchangeRates | null>(null);
  const [amount, setAmount] = useState('1000000');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRates() {
      setIsLoading(true);
      const nextRates = await fetchLiveExchangeRates();

      if (!isMounted) return;

      setRates(nextRates);
      setIsLoading(false);
    }

    loadRates();
    const intervalId = window.setInterval(loadRates, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const convertedAmount = useMemo(() => {
    const numericAmount = Number(amount.replaceAll(',', ''));
    if (!rates || Number.isNaN(numericAmount)) return 0;
    return numericAmount * rates.vndToTwd;
  }, [amount, rates]);

  return (
    <article className="min-w-0 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
            <ArrowRightLeft className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-emerald-700">即時匯率</p>
            <h3 className="text-xl font-black text-stone-950">VND 換算 TWD</h3>
          </div>
        </div>
        <RefreshCw className={`h-4 w-4 text-stone-400 ${isLoading ? 'animate-spin' : ''}`} />
      </div>

      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <RateBox label="1 TWD" value={rates ? `${Math.round(rates.twdToVnd).toLocaleString('zh-TW')} VND` : '--'} />
        <RateBox label="1 USD" value={rates ? `${Math.round(rates.usdToVnd).toLocaleString('zh-TW')} VND` : '--'} />
      </div>

      <div className="mt-4 rounded-lg border border-stone-200 p-3">
        <label className="text-sm font-semibold text-stone-700" htmlFor="vnd-converter">
          越南盾換台幣
        </label>
        <div className="mt-2 grid gap-2">
          <input
            id="vnd-converter"
            className="min-h-11 min-w-0 rounded-md border border-stone-300 px-3 py-2 text-base focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            inputMode="numeric"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <p className="rounded-md bg-emerald-700 px-3 py-2 text-base font-bold text-white">
            約 NT${Math.round(convertedAmount).toLocaleString('zh-TW')}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-stone-200">
        <div className="grid grid-cols-2 bg-stone-100 px-3 py-2 text-sm font-bold text-stone-700">
          <span>VND</span>
          <span>TWD</span>
        </div>
        {quickVndAmounts.map((vnd) => (
          <div key={vnd} className="grid grid-cols-2 border-t border-stone-100 px-3 py-2 text-sm">
            <span>{vnd.toLocaleString('zh-TW')}</span>
            <span>{rates ? Math.round(vnd * rates.vndToTwd).toLocaleString('zh-TW') : '--'}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-5 text-stone-500">
        更新時間：{rates ? new Date(rates.updatedAt).toLocaleString('zh-TW') : '載入中'}
        {rates?.source === 'fallback' ? '，目前使用備用匯率。' : ''}
      </p>
    </article>
  );
}

function RateBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <p className="text-stone-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-stone-950">{value}</p>
    </div>
  );
}
