import { useState } from 'react';

export default function useLocalStorage(key, defValue) {

  const [state, setState] = useState(() => {

    const localStorageState = localStorage.getItem(key);

    if (localStorageState) {
      return JSON.parse(localStorageState);
    }

    return defValue;
  });

  const setLocalStorageState = (value) => {

    setState(value);

    let serilizingValue;

    if (typeof value === 'function') {
        
      serilizingValue = JSON.stringify(value(state));

    } else {

      serilizingValue = JSON.stringify(value);
    }
    
    localStorage.setItem(key, serilizingValue);
  };

  return [state, setLocalStorageState];
}
