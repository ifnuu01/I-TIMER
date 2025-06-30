import './App.css'
import TimerForm from './components/TimerForm'
import TimerDisplay from './components/TimerDisplay'
import { useState } from 'react';

type Timer = {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
};

function App() {
  const [timer, setTimer] = useState<Timer>({
    hours: "0",
    minutes: "0",
    seconds: "0",
    totalSeconds: 0
  });

  const [started, setStarted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-darker via-custom-dark to-custom-darker">
      {!started ? (
        <TimerForm
          timer={timer}
          setTimer={setTimer}
          onStart={() => setStarted(true)}
        />
      ) : (
        <TimerDisplay timer={timer} onBack={() => setStarted(false)} />
      )}
    </div>
  )
}

export default App
