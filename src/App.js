import './App.css';
import {useEffect, useState} from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SymbolSelector from "./components/SymbolSelector";
import SelectedSymbols from "./components/SelectedSymbols";
import {getStockCandle, getStockSymbol} from "./modules/api/connectors";

function App() {
    const MAX_SELECTED_SYMBOLS = 3;

    const [symbols, setSymbols] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        getStockSymbol('US').then(setSymbols);
    }, []);

    useEffect(() => {
        selectedSymbols.forEach(symbol => {
            getStockCandle(symbol, startDate, endDate);
        });
    }, [selectedSymbols, startDate, endDate]);

    const handleSymbolSelect = symbol => {
        setSelectedSymbols([...selectedSymbols, symbol]);
    };

    return (
        <div className="App">
            <SymbolSelector symbols={symbols} onChange={handleSymbolSelect} disabled={selectedSymbols.length >= MAX_SELECTED_SYMBOLS} />
            <SelectedSymbols symbols={selectedSymbols} onChange={setSelectedSymbols} />
            From: <Datepicker selected={startDate} onChange={setStartDate} />
            To: <Datepicker selected={endDate} onChange={setEndDate} />
        </div>
    );
}

export default App;
