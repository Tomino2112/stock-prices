const SymbolSelector = ({symbols, onChange, disabled}) => {
    const renderSymbolOption = symbol => <option key={`symbol-${symbol.symbol}`}
                                                 value={symbol.symbol}>{symbol.description}</option>;

    const handleSymbolChange = event => {
        onChange(event.target.value);
    };

    return (
        <select className={"symbol-selector"} onChange={handleSymbolChange} disabled={disabled}>
            {symbols.map(renderSymbolOption)}
        </select>
    );
};

export default SymbolSelector;