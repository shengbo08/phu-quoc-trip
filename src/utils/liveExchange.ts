export interface LiveExchangeRates {
  twdToVnd: number;
  usdToVnd: number;
  vndToTwd: number;
  updatedAt: string;
  source: 'live' | 'fallback';
}

interface ExchangeRateResponse {
  time_last_update_utc?: string;
  rates?: Record<string, number>;
}

const fallbackRates: LiveExchangeRates = {
  twdToVnd: 833,
  usdToVnd: 25300,
  vndToTwd: 0.0012,
  updatedAt: new Date().toISOString(),
  source: 'fallback',
};

export async function fetchLiveExchangeRates(): Promise<LiveExchangeRates> {
  try {
    const [usdResponse, twdResponse] = await Promise.all([
      fetch('https://open.er-api.com/v6/latest/USD'),
      fetch('https://open.er-api.com/v6/latest/TWD'),
    ]);

    if (!usdResponse.ok || !twdResponse.ok) {
      throw new Error('Exchange rate request failed');
    }

    const usdData = (await usdResponse.json()) as ExchangeRateResponse;
    const twdData = (await twdResponse.json()) as ExchangeRateResponse;
    const usdToVnd = usdData.rates?.VND;
    const twdToVnd = twdData.rates?.VND;

    if (!usdToVnd || !twdToVnd) {
      throw new Error('Missing VND exchange rates');
    }

    return {
      twdToVnd,
      usdToVnd,
      vndToTwd: 1 / twdToVnd,
      updatedAt: twdData.time_last_update_utc ?? new Date().toISOString(),
      source: 'live',
    };
  } catch (error) {
    console.warn(error);
    return fallbackRates;
  }
}
