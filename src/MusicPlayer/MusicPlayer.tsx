import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward, faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons'

import './MusicPlayer.scss';
import {IMusicPlayerProps} from "../models/music-player.props";
import {convertToRGB} from "../shared/convertToRGB.method";
import Backdrop from "./Backdrop";

const MusicPlayer: React.FC<IMusicPlayerProps> = ({tracks}) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const {title, artist, color, image, audioSrc} = tracks[trackIndex];

    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef(0);
    const isReady = useRef(false);

    const {duration} = audioRef.current;

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
    const bgColor = convertToRGB(color);
    const playerBG = `linear-gradient(rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, 0.5), rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, 0.5)), url(${image})`
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
    }, [trackIndex]);

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }

    const onScrub = (value: any) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    return (
        <div className='musicPlayer' style={{backgroundImage: `${playerBG}`}}>
            <div className='albumAndArtistName'>
                <h4>{title}</h4>
                <p>{artist}</p>
            </div>

            <div className="musicProgress">
                <input
                    type="range"
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    value={trackProgress}
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    className="seekSlider"
                    style={{ background: trackStyling }}
                />
            </div>

            <div className='playerControls'>
                <div className="prevTrack" onClick={toPrevTrack}>
                    <FontAwesomeIcon icon={faBackward} size="2x"/>
                </div>
                <div className="playOrPauseTrack" onClick={() => setIsPlaying(!isPlaying)}>
                    <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} size="4x"/>
                </div>
                <div className="nextTrack" onClick={toNextTrack}>
                    <FontAwesomeIcon icon={faForward} size="2x"/>
                </div>
            </div>
            <Backdrop
                trackIndex={trackIndex}
                activeColor={color}
                isPlaying={isPlaying}
            />
        </div>
    );
}

export default MusicPlayer;
