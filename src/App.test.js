import { render } from '@testing-library/react';
import App from './App';
import { fireEvent, act } from "@testing-library/react";
import { getStockSymbol, getStockCandle } from './modules/api/connectors';

jest.mock('./modules/api/connectors');

describe("basics", () => {
  beforeEach(() => {
    getStockCandle.mockResolvedValue({ s: "no_data" });
  });

  test('selecting a symbol adds it to selected list', async () => {
    getStockSymbol.mockResolvedValue([{ symbol: "TEST", description: "Testing symbol" }])

    const { getAllByTestId, findByDisplayValue } = render(<App />);

    fireEvent.change(await findByDisplayValue(/Select symbol/i), { target: { value: "TEST" } });

    const symbolsElements = getAllByTestId('selected-symbol');
    expect(symbolsElements.length).toBe(1);
  });

  test('disables selector when 3 symbols selected', async () => {
    getStockSymbol.mockResolvedValue([
      { symbol: "TEST1", description: "Testing symbol" },
      { symbol: "TEST2", description: "Testing symbol" },
      { symbol: "TEST3", description: "Testing symbol" }
    ]);

    const { getByTestId, findByDisplayValue } = render(<App />);

    const defaultOption = await findByDisplayValue(/Select symbol/i);

    fireEvent.change(defaultOption, { target: { value: "TEST1" } });
    fireEvent.change(defaultOption, { target: { value: "TEST2" } });
    fireEvent.change(defaultOption, { target: { value: "TEST3" } });

    expect(getByTestId("symbol-selector")).toBeDisabled();
  });
});