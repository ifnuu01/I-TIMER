import { Play, Pause, Repeat, ArrowLeftToLine } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import sound from '../../public/sound.wav';
import type { Props } from '../types/timer.type';


function TimerDisplay({ timer, onBack }: Props) {
    const [remaining, setRemaining] = useState(timer.totalSeconds);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const soundIntervalRef = useRef<number | null>(null);
    const soundRef = useRef<HTMLAudioElement[]>([]);

    useEffect(() => {
        if (isFinished) {
            const audio = new Audio(sound);
            audio.loop = false;
            audio.play();
            soundRef.current.push(audio);

            soundIntervalRef.current = setInterval(() => {
                const newAudio = new Audio(sound);
                newAudio.loop = false;
                newAudio.play();
                soundRef.current.push(newAudio)
            }, 4000);
        }

        return () => {
            if (soundIntervalRef.current) {
                clearInterval(soundIntervalRef.current);
                soundIntervalRef.current = null;
            }

            soundRef.current.forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });
            soundRef.current = [];
        };
    }, [isFinished]);


    useEffect(() => {
        if (isPaused || remaining <= 0) return;

        const interval = setInterval(() => {
            setRemaining((prev) => {
                if (prev === 1) {
                    setIsFinished(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remaining, isPaused]);

    const format = (s: number) => {
        const h = String(Math.floor(s / 3600)).padStart(2, '0');
        const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
        const d = String(s % 60).padStart(2, '0');
        return `${h}:${m}:${d}`;
    }

    const stopSound = () => {
        setRemaining(timer.totalSeconds);
        setIsPaused(false);
        setIsFinished(false);

        if (soundIntervalRef.current) {
            clearInterval(soundIntervalRef.current);
            soundIntervalRef.current = null;
        }
        soundRef.current.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        soundRef.current = [];
    }

    return (
        <div className='flex items-center justify-center h-screen text-white'>
            <div className='w-full md:w-1/2 flex flex-col justify-center p-4 md:p-0'>
                <div className={`bg-custom-dark ${isFinished ? 'shadow-red-900' : 'shadow-fuchsia-900'} shadow-2xl mt-4 px-20 py-10 rounded-lg grid grid-cols-5`}>
                    <div className='flex flex-col items-center'>
                        <span className='text-6xl font-bold'>{format(remaining).split(':')[0]}</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-6xl font-bold'>:</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-6xl font-bold'>{format(remaining).split(':')[1]}</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-6xl font-bold'>:</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-6xl font-bold'>{format(remaining).split(':')[2]}</span>
                    </div>
                </div>
                <div className='flex items-center gap-8 mt-20'>
                    <button
                        onClick={() => {
                            setIsPaused(!isPaused);
                        }}
                        className='flex justify-center font-bold bg-custom-dark rounded-lg shadow-lg py-5 w-full cursor-pointer hover:scale-110'>{isPaused ? <Play /> : <Pause />}</button>
                    <button
                        onClick={() => {
                            stopSound();
                        }}
                        className='flex justify-center font-bold bg-custom-dark rounded-lg shadow-lg py-5 w-full cursor-pointer hover:scale-110'><Repeat /></button>
                    <button
                        onClick={() => {
                            stopSound();
                            onBack()
                        }}
                        className='flex justify-center font-bold bg-custom-dark rounded-lg shadow-lg py-5 w-full cursor-pointer hover:scale-110'><ArrowLeftToLine /></button>
                </div>
            </div>
        </div>
    )
}

export default TimerDisplay