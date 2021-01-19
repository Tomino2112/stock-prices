import makeRequest from "./makeRequest";

export const getStockSymbol = (exchange) => {
    return Promise.resolve(require('./symbols_short.json'))
    // return makeRequest(`stock/symbol?exchange=${exchange}`);
}

export const getStockCandle = (symbol, startDate, endDate) => {
    const params = new URLSearchParams({
        symbol,
        from: startDate.getTime(),
        to: endDate.getTime(),
        resolution: 1
    });

    return makeRequest(`stock/candle?${params}`);
};