/**
 * useCounter hook, it will handle increment and decrement of a numeric value by 1
 */
import { useState } from 'react';

/**
 * useCounter
 * @param {number} initialValue it will set the initial value to start
 */
export default function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const resetCounter = (counterValue = 0) => {
    setCounter(counterValue);
  };

  return {
    counter,
    increment,
    decrement,
    resetCounter,
  };
}
