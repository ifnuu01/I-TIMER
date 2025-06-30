export type Timer = {
    hours: string;
    minutes: string;
    seconds: string;
    totalSeconds: number;
};

export type TimerFormProps = {
    timer: Timer;
    setTimer: (timer: Timer) => void;
    onStart: () => void;
};

export type Props = {
    timer: Timer;
    onBack: () => void;
};