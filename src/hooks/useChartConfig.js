import {useEffect, useState} from "react";

export default function useChartConfig({
    chartData,
    subset
}) {
    const [data, setData] = useState({
        data: []
    });

    useEffect(() => {
        setData(generateData(chartData, subset));
    }, [chartData, subset]);

    return data;
}

function generateData(chartData, subset) {
    return chartData.filter(serie => serie.s === "ok").map(serie => {
        return {
            label: serie.symbol,
            data: serie.t.map((timestamp, index) => ({
                primary: new Date(timestamp * 1000),
                secondary: serie[subset][index]
            }))
        };
    });
}