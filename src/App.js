import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [time, setTime] = useState(0);                                      // стейт времени
  const [isCounting, setCounting] = useState(false);                      // стейт счетчика

  const getPadTime = (someTime) => someTime.toString().padStart(2, "0");  // хелпер для формата 00:00:00

  const hrs = getPadTime(Math.floor(time / 3600));
  const mins = getPadTime(Math.floor((time - 3600 * hrs) / 60));          // "остаток секунд / 60"
  const secs = getPadTime(time % 60);                                     // остаток от деления на 60

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCounting]);

  const handleStart = () => {
    setCounting(true);
  };

  const handleStop = () => {
    setCounting(false);
  };

  const handleReset = () => {
    setCounting(false);
    setTime(0);
  };

  return (
    <div className="App">
      <div>
        {hrs}:{mins}:{secs}
      </div>
      <button onClick={handleStart} disabled={isCounting}>
        START
      </button>
      <button onClick={handleStop} disabled={!isCounting}>
        STOP
      </button>
      <button onClick={handleReset} disabled={time === 0}>
        RESET
      </button>
    </div>
  );
}

export default App;
