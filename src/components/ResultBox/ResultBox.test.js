import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import ResultBox from './ResultBox';
  
describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    
    const testCases = [
      100, 25, 317.28, 2.57
    ];
    
    for (const testObj of testCases) {
      // render component
      render(<ResultBox from="PLN" to="USD" amount={testObj} />);

      // find output div element
      const output = screen.getByTestId('output');

      const expectedOutput = `${formatAmountInCurrency(testObj, 'PLN')} = ${convertPLNToUSD(testObj)}`;

      // check if result box has proper content
      expect(output).toHaveTextContent(expectedOutput);

      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    
    const testCases = [
      100, 25, 317.28, 2.57
    ];
    
    for (const testObj of testCases) {
      // render component
      render(<ResultBox from="USD" to="PLN" amount={testObj} />);

      // find output div element
      const output = screen.getByTestId('output');

      const expectedOutput = `${formatAmountInCurrency(testObj, 'USD')} = ${convertUSDToPLN(testObj)}`;

      // check if result box has proper content
      expect(output).toHaveTextContent(expectedOutput);

      cleanup();
    }
  });

  it('should render proper info about conversion options are the same', () => {
    
    const testCases = [
      { amount: 100, fromAndTo: 'PLN' },
      { amount: 25, fromAndTo: 'USD' },
      { amount: 317.28, fromAndTo: 'PLN' },
      { amount: 2.57, fromAndTo: 'USD' },
    ];
    
    for (const testObj of testCases) {
      // render component
      render(<ResultBox from={testObj.fromAndTo} to={testObj.fromAndTo} amount={testObj.amount} />);

      // find output div element
      const output = screen.getByTestId('output');

      const expectedOutput = `${formatAmountInCurrency(testObj.amount, testObj.fromAndTo)} = ${formatAmountInCurrency(testObj.amount, testObj.fromAndTo)}`;

      // check if result box has proper content
      expect(output).toHaveTextContent(expectedOutput);

      cleanup();
    }
  });

  it('should render error message when wrong value', () => {
    
    const testCases = [
      -123, NaN
    ];
    
    for (const testObj of testCases) {
      // render component
      render(<ResultBox from="PLN" to="PLN" amount={testObj} />);

      // find output div element
      const output = screen.getByTestId('output');

      // check if result box has proper content
      expect(output).toHaveTextContent('Wrong value...');

      cleanup();
    }
  });    
});