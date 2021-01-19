import './App.css';
import {useEffect, useState} from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SymbolSelector from "./components/SymbolSelector";
import SelectedSymbols from "./components/SelectedSymbols";
import {getStockCandle, getStockSymbol} from "./modules/api/connectors";
import StockChart from "./components/StockChart";

function App() {
    const MAX_SELECTED_SYMBOLS = 3;
    const initStartDate = new Date();
    initStartDate.setMonth(initStartDate.getMonth() - 1);

    const [symbols, setSymbols] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]);
    const [startDate, setStartDate] = useState(initStartDate);
    const [endDate, setEndDate] = useState(new Date());
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        getStockSymbol('US').then(setSymbols);
    }, []);

    useEffect(() => {
        if (!selectedSymbols.length) {
            setPriceData([]);
        }

        Promise.all(selectedSymbols.map(symbol =>
            getStockCandle(symbol, startDate, endDate)
        )).then(setPriceData);
    }, [selectedSymbols, startDate, endDate]);

    const handleSymbolSelect = symbol => {
        setSelectedSymbols([...selectedSymbols, symbol]);
    };

    return (
        <div className="App">
            <h1>Stock prices</h1>

            <section>
                <SymbolSelector symbols={symbols} onChange={handleSymbolSelect} disabled={selectedSymbols.length >= MAX_SELECTED_SYMBOLS} />
            </section>

            <section>
                <SelectedSymbols symbols={selectedSymbols} onChange={setSelectedSymbols} />
            </section>

            <section className={"date-selector"}>
                <div className={"date-select"}>
                    From: <Datepicker selected={startDate} onChange={setStartDate} />
                </div>
                <div className={"date-select"}>
                    To: <Datepicker selected={endDate} onChange={setEndDate} />
                </div>
            </section>

            <section>
                { selectedSymbols.length ? <StockChart data={priceData} /> : <div className={"no-symbols"}>Select Symbols</div> }
            </section>
        </div>
    );
}

export default App;
