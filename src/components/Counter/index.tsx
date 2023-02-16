import { useState } from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  save,
} from "../../features/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const savedValue = useSelector(
    (state: RootState) => state.counter.savedValue
  );
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);

  console.log("saved", savedValue);
  console.log("amount", amount);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <button aria-label="Reset value" onClick={() => dispatch(reset())}>
        Reset
      </button>
      <button onClick={() => dispatch(incrementByAmount(amount))}>
        Amount
      </button>
      <input
        type="number"
        placeholder="amount"
        onChange={(e: any) => setAmount(e.target.value)}
      />
      <button onClick={() => dispatch(save(count))}>Save</button>
      {savedValue > 0 && <span>{savedValue}</span>}
    </div>
  );
};

export default Counter;
