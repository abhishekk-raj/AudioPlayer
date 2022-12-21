import React, {useEffect} from 'react';
import {IBackdrop} from "../models/backdrop.props";

const Backdrop: React.FC<IBackdrop> = ({activeColor, trackIndex, isPlaying}) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--active-color', activeColor);
    }, [trackIndex]);

    return (
        <div className={`colorBackdrop ${isPlaying ? 'playing' : 'idle'}`}/>
    );
};

export default Backdrop;
