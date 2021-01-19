const SelectedSymbols = ({ symbols, onChange }) => {
    const renderSymbol = symbol => {
        return (
            <div key={`selected-symbol-${symbol}`}>
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

    return symbols.map(renderSymbol);
};

export default SelectedSymbols;
