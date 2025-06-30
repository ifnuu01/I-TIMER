import { Hourglass, Play } from 'lucide-react';
import type { TimerFormProps, Timer } from '../types/timer.type';


function TimerForm({ timer, setTimer, onStart }: TimerFormProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Timer) => {
        setTimer({ ...timer, [field]: e.target.value });
    };

    const handleSubmit = () => {
        const totalSeconds =
            (parseInt(timer.hours) || 0) * 3600 +
            (parseInt(timer.minutes) || 0) * 60 +
            (parseInt(timer.seconds) || 0);

        if (totalSeconds <= 0) {
            alert("Masukkan waktu yang valid!");
            return;
        }

        setTimer({ ...timer, totalSeconds });
        onStart();
    };

    return (
        <div className="flex items-center justify-center flex-col h-screen text-white">
            <h1 className="bg-custom-dark p-10 rounded-lg text-4xl shadow-lg font-bold shadow-fuchsia-900">I-TIMER</h1>
            <div className="flex items-center gap-4 mt-8 w-1/2">
                <div className="flex flex-col w-full">
                    <span className=" font-bold flex gap-2 items-center mb-2"><Hourglass /><span>Jam</span></span>
                    <input className="bg-custom-dark rounded-full p-4 shadow-lg" type="number" value={timer.hours} onChange={(e) => handleInputChange(e, "hours")} />
                </div>
                <div className="flex flex-col w-full ">
                    <span className=" font-bold flex gap-2 items-center mb-2"><Hourglass /><span>Menit</span></span>
                    <input className="bg-custom-dark rounded-full p-4 shadow-lg" type="number" value={timer.minutes} onChange={(e) => handleInputChange(e, "minutes")} />
                </div>
                <div className="flex flex-col w-full ">
                    <span className=" font-bold flex gap-2 items-center mb-2"><Hourglass /><span>Detik</span></span>
                    <input className="bg-custom-dark rounded-full p-4 shadow-lg" type="number" value={timer.seconds} onChange={(e) => handleInputChange(e, "seconds")} />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className='mt-8 flex justify-center font-bold bg-custom-dark rounded-lg shadow-lg py-5 w-1/2 cursor-pointer hover:scale-110'><Play /></button>
        </div>
    )
}

export default TimerForm