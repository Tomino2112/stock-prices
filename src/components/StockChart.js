import {Chart} from "react-charts";

import {useEffect, useMemo, useState} from "react";
import useChartConfig from "../hooks/useChartConfig";

export default function StockChart(props) {
    const [subset, setSubset] = useState('o');
    const chartData = useChartConfig({ chartData: props.data, subset });

    const handleSubsetChange = event => {
        setSubset(event.target.value);
    }

    const series = useMemo(
        () => ({
            showPoints: false,
        }),
        []
    );

    const axes = useMemo(
        () => [
            {
                primary: true,
                type: "time",
                position: "bottom",
            },
            {type: "linear", position: "left"},
        ],
        []
    );

    return (
        <>
            <select className={"chart-subset-select"} onChange={handleSubsetChange}>
                <option value={'o'}>Open prices</option>
                <option value={'h'}>High prices</option>
                <option value={'l'}>Low prices</option>
                <option value={'c'}>Close prices</option>
            </select>
            <div
                style={{
                    width: '100%',
                    height: `400px`,
                    margin: '20px 0'
                }}
            >
                <Chart data={chartData} series={series} axes={axes} tooltip/>
            </div>
        </>
    );
}