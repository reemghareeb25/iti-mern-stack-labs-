import { useState } from 'react';
import './style.css';


const Coin = () => {
  const [flips, setFlips] = useState(0);
  const [head, setHeads] = useState(0);
  const [tail, setTails] = useState(0);
  
  const [currentSide, setCurrentSide] = useState(null);

  const flipCoin = () => {
    const isHeads = (Math.random() > 0.5);

    setFlips(flips + 1);
    if (isHeads) {
      setHeads(head + 1);
      setCurrentSide('head');
    } else {
      setTails(tail + 1);
      setCurrentSide('tail');
    }
  };

  return (
    <div className= "coin-container">
      <h1>Let's flip a coin!</h1>
      {currentSide && (
        <img
        src={
          currentSide !== 'head'
            ? '/quarter-transparent-background-14.jpg'
            : '/R.png'
        }
        alt={currentSide}
        className="coin-image"
      />
      )}

      <button onClick={flipCoin} className="flip-button">
        Flip Coin
      </button>
      <p>
        Out of {flips} flips, there have been {head} heads and {tail} tails.
      </p>
    </div>
  );
};

export default Coin;
