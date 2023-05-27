import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useEffect, useMemo, useState } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {

  const [wrongValue, setWrongValue] = useState(false);

  const convertedAmount = useMemo(() => {
    if(from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if(from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  useEffect(() => {
    if (amount < 0
    || isNaN(amount)
    || Array.isArray(amount)
    || amount instanceof String
    || amount === null    
    || typeof amount === 'string'    
    || typeof amount === 'undefined'
    || typeof amount === 'object'
    || typeof amount === 'function') {
      setWrongValue(true);
    } else {
      setWrongValue(false);
    }
  }, [amount, wrongValue]);

  return (
    <div className={styles.result} data-testid="output">
      {
        wrongValue ? "Wrong value..." : (`${formattedAmount} = ${convertedAmount}`)
      }      
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;