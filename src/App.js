import React, { useEffect, useRef, useState } from 'react';
import Block from './components/Block';
import Date from './components/UI/Date';
import './assets/styles/index.scss';
import Swap from './components/UI/Swap';
function App() {

const [fromCurrency, setFromCurrency] = useState('RUB');
const [toCurrency, setToCurrency] = useState('USD');
const [fromPrice, setFromPrice] = useState(0);
const [toPrice, setToPrice] = useState(1);
const [showFromCourse, setShowFromCourse] = useState(0);
const [showToCourse, setShowToCourse] = useState(0);
const [swap, setSwap] = useState(false);
const [lastupdate, setLastupdate] = useState('');

const ratesRef = useRef({});

useEffect(() => {
  fetch('https://cdn.cur.su/api/latest.json')
  .then((res) => res.json())
  .then((json) => {
    ratesRef.current = json.rates;
    setLastupdate(json.lastupdate);
    onChangeToPrice(1);
  })
  .catch((err) => {
    console.warn(err);
    alert('Не удалось полуить информацию')
  })
}, []);

const onChangeFromPrice = (value) => {
  setShowFromCourse((parseInt(1 / ratesRef.current[toCurrency] * ratesRef.current[fromCurrency] * 10000) / 10000));
  setShowToCourse((parseInt(ratesRef.current[toCurrency] / ratesRef.current[fromCurrency] * 10000) / 10000));

  const price = value / ratesRef.current[fromCurrency];
  const result = price * ratesRef.current[toCurrency];
  
  setToPrice(result.toFixed(2));
  setFromPrice(value);
}

const onChangeToPrice = (value) => {
  setShowFromCourse((parseInt(1 / ratesRef.current[toCurrency] * ratesRef.current[fromCurrency] * 10000) / 10000));
  setShowToCourse((parseInt(ratesRef.current[toCurrency] / ratesRef.current[fromCurrency] * 10000) / 10000));

  const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setFromPrice(result.toFixed(2));
  setToPrice(value);
}

useEffect(() => {
  onChangeFromPrice(fromPrice);
}, [fromCurrency]);

useEffect(() => {
  onChangeToPrice(toPrice);
}, [toCurrency]);

function onClickSwapСurrencies () {
  setSwap(prev => !prev);

  const tempPrice = fromPrice;
  setFromPrice(toPrice);
  setToPrice(tempPrice);

  const tempCurrency = fromCurrency;
  setFromCurrency(toCurrency);
  setToCurrency(tempCurrency);

  const tempShow = showFromCourse;
  setShowFromCourse(showToCourse);
  setShowToCourse(tempShow);
}
 
  return (
    <div className="App">

      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice} 
        showCourse={showFromCourse}
        toCurrency={toCurrency}
      />

      <Swap 
        swap={swap} 
        onClickSwapСurrencies={onClickSwapСurrencies}
      />

      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
        showCourse={showToCourse}
        toCurrency={fromCurrency}
      />

      <Date 
        lastupdate={lastupdate}
      />

    </div>
  );
}

export default App;
