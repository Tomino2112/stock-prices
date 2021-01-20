const SelectedSymbols = ({symbols, onChange}) => {
    const renderSymbol = symbol => {
        return (
            <div key={`selected-symbol-${symbol}`} className={"symbol-selected"} data-testid={"selected-symbol"}>
                {symbol}
                <button onClick={() => handleRemoveSymbol(symbol)}>x</button>
            </div>
        );
    };

    const handleRemoveSymbol = symbol => {
        const newSymbols = [...symbols];
        newSymbols.splice(newSymbols.indexOf(symbol), 1);
        onChange(newSymbols);
    };

    return (<div className={"selected-symbols"}>{symbols.map(renderSymbol)}</div>);
};

export default SelectedSymbols;
