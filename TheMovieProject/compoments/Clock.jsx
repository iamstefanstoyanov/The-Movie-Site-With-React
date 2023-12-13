import { useState } from 'react';
export default function Clock() {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div className='clock lock'>
      <p>Current time:</p>
      <p>{ctime}</p>
    </div>
  );
}
