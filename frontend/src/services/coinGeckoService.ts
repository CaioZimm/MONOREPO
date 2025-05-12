import { coinGeckoApi } from "../config/AxiosConfig";

const cryptoCache = {
    data: null as any,
    timestamp: 0,
    ttl: 5 * 60 * 1000
};

export const getCryptos = async () => {
    if (Date.now() - cryptoCache.timestamp < cryptoCache.ttl && cryptoCache.data) {
        return cryptoCache.data;
    }

    try {
        const res = await coinGeckoApi.get("/coins/markets", {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });

    cryptoCache.data = res.data;
    cryptoCache.timestamp = Date.now();

    return res.data;

  } catch (error) {
    if (cryptoCache.data) {
        console.error("Error", error);
        return cryptoCache.data;
    }
    
    throw error;
  }
};