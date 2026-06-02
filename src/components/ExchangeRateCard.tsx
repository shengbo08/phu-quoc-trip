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
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
            <ArrowRightLeft className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-emerald-700">今日匯率</p>
            <h3 className="text-xl font-bold text-stone-950">TWD ⇄ VND / USD ⇄ VND</h3>
          </div>
        </div>
        <RefreshCw className={`h-4 w-4 text-stone-400 ${isLoading ? 'animate-spin' : ''}`} />
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-stone-50 p-3">
          <p className="text-stone-500">1 TWD</p>
          <p className="mt-1 text-xl font-bold text-stone-950">
            {rates ? `${Math.round(rates.twdToVnd).toLocaleString('zh-TW')} VND` : '--'}
          </p>
        </div>
        <div className="rounded-lg bg-stone-50 p-3">
          <p className="text-stone-500">1 USD</p>
          <p className="mt-1 text-xl font-bold text-stone-950">
            {rates ? `${Math.round(rates.usdToVnd).toLocaleString('zh-TW')} VND` : '--'}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-stone-200 p-3">
        <label className="text-sm font-semibold text-stone-700" htmlFor="vnd-converter">
          快速換算 VND → TWD
        </label>
        <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
          <input
            id="vnd-converter"
            className="min-w-0 rounded-md border border-stone-300 px-3 py-2 text-base focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
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

      <p className="mt-3 text-xs text-stone-500">
        最後更新：{rates ? new Date(rates.updatedAt).toLocaleString('zh-TW') : '讀取中'}。
        {rates?.source === 'fallback' ? '目前使用備用匯率。' : ''}
      </p>
    </article>
  );
}
