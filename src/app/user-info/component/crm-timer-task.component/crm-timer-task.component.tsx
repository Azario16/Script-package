/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import './crm-timer-task.component.scss'

export default function TimerComponent(props: any) {
    const [elapsedTime, setElapsedTime] = useState(0);

    const claculateTime = () => {
        if(!props.startDate){
            return;
        }
        const now: number = new Date().getTime();
        const startTime: number = new Date(props.startDate).getTime();
        const elapsedMilliseconds: number = now - startTime;
        setElapsedTime(elapsedMilliseconds);
    }

    useEffect(() => {
        claculateTime()
        const intervalId = setInterval(claculateTime, 1000);

        return () => clearInterval(intervalId);
    }, [props.startDate]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className='text-center time'>{formatTime(elapsedTime)}</div>
    );
}