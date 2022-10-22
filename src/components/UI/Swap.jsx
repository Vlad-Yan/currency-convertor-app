import React from 'react';
import '../../assets/styles/index.scss';
import SwapImg from '../../assets/images/swap-places.png';

const Swap = ( {swap, onClickSwapСurrencies} ) => {
    return (
        <div className='swap'>
        <img
          className={swap === true ? 'active' : ''}
          onClick={onClickSwapСurrencies} src={SwapImg} alt={SwapImg}/>
      </div>
    );
};

export default Swap;