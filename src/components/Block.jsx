import React from 'react';

const Block = ({ 
  value, 
  currency, 
  onChangeValue, 
  onChangeCurrency,
  showCourse,
  toCurrency
}) => {

  const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

  return (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}>
          {cur}
        </li>
      ))}
    </ul>
    <div className='input-container'>
      <input
        onChange={(e) => onChangeValue(e.target.value.replace(/[^0-9.]/g, ''))}
        value={value}
        type="text"
        placeholder={0}
      />
      <p>1 {currency} = {showCourse} {toCurrency} </p>
    </div>
  </div>
  );
};
  
export default Block;
