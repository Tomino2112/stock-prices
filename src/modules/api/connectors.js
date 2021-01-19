import makeRequest from "./makeRequest";

export const getStockSymbol = (exchange) => {
    // return makeRequest(`stock/symbol?exchange=${exchange}`);
    return Promise.resolve(require('./symbols_short.json'))
}

export const getStockCandle = (symbol, startDate, endDate) => {
    const params = new URLSearchParams({
        symbol,
        from: parseInt(startDate.getTime()/1000),
        to: parseInt(endDate.getTime()/1000),
        resolution: 1
    });

    return makeRequest(`stock/candle?${params}`).then(data => ({symbol, ...data}));
};