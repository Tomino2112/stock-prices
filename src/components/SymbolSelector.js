const SymbolSelector = ({ symbols, onChange, disabled }) => {
    const renderSymbolOption = symbol => <option key={`symbol-${symbol.symbol}`} value={symbol.symbol}>{symbol.description}</option>;

    const handleSymbolChange = event => {
        onChange(event.target.value);
    };

    return (
        <div>
            Symbol:
            <select onChange={handleSymbolChange} disabled={disabled}>
                {symbols.map(renderSymbolOption)}
            </select>
        </div>
    );
};

export default SymbolSelector;