import React from 'react';

import './App.scss';
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import {musicTracks} from "./assets/music-tracks";

function App() {
    return (
        <div className="App">
            <MusicPlayer tracks={musicTracks}/>
        </div>
    );
}

export default App;
