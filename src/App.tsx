import React from 'react';

import './App.scss';
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import {musicTracks} from "./assets/music-tracks";

function App() {
    return (
        <div className="App">
            <h1 className='merryChristmas'>Merry Christmas</h1>
            <MusicPlayer tracks={musicTracks}/>
        </div>
    );
}

export default App;
