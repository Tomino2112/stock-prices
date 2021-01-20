const SymbolSelector = ({ symbols, onChange, disabled }) => {
    const renderSymbolOption = symbol => (
        <option key={`symbol-${symbol.symbol}`} value={symbol.symbol}>
            {symbol.description}
        </option>
    );

    const handleSymbolChange = event => {
        if (!event.target.value) return;
        onChange(event.target.value);
    };

    return (
        <select
            data-testid={"symbol-selector"}
            className={"symbol-selector"}
            onChange={handleSymbolChange}
            disabled={disabled}
        >
            <option value={""}>Select symbol</option>
            {symbols.map(renderSymbolOption)}
        </select>
    );
};

export default SymbolSelector;