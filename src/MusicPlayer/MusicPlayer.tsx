import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward, faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons'

import './MusicPlayer.scss';

const MusicPlayer = () => {
    const [playOrPauseButtonIcon, setPlayOrPauseButtonIcon] = useState(faPauseCircle);

    return (
        <div className='musicPlayer'>
            <div className='albumAndArtistName'>
                <h4>Song Name</h4>
                <p>Artist Name</p>
            </div>

            <div className="musicProgress">
                <input type="range" min="1" max="100" value='20' className="seekSlider"/>
            </div>

            <div className='playerControls'>
                <div className="prevTrack">
                    <FontAwesomeIcon icon={faBackward} size="2x"/>
                </div>
                <div className="playOrPauseTrack">
                    <FontAwesomeIcon icon={playOrPauseButtonIcon} size="4x"/>
                </div>
                <div className="nextTrack">
                    <FontAwesomeIcon icon={faForward} size="2x"/>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
