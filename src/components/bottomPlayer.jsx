import React, {useEffect, useState} from 'react';
import './component.scss';
import playerRewind from "./player-rewind.svg";
import playerPlay from "./player-play.svg";
import playerForward from "./player-forward.svg";

const BottomPlayer = ({bcgTitle, currentAudioPlay, changeCurrentTime,
                          currentTimeAudioPlay, nextSong, prevSong,
                          playMusic, pauseMusic, changeVolume, currentVolume
}) => {

    return (
        <footer className="bottom-player">
            <div className="bottom-player__img-title">
                <div className="play-list__img">
                    <img className="play-list__img-el" src={bcgTitle.image} alt=""/>
                </div>
                <div className="play-list__title">{currentAudioPlay.name}</div>
            </div>
            <div className="player">
                <div className="player__all-controls">
                    <div className="player-controls">
                        <div className="play__range">
                            <input onChange={changeCurrentTime}
                                   className="play__range-el"
                                   type="range"
                                   value={currentTimeAudioPlay}
                                   step="any"
                                   min="0" max={currentAudioPlay.duration}/>
                        </div>
                        <div className="all-button">
                            <div className="play__range-timing">
                                <span className="currentTime">
                                            {Math.trunc(currentTimeAudioPlay / 60)}:{currentTimeAudioPlay % 60}
                                </span>
                            </div>
                            <div className="all-button__elements">
                                <button onClick={prevSong} className="play-prev player-icon">
                                    <img src={playerRewind} className="player-icon-el" alt="prev"/>
                                </button>
                                <button onClick={playMusic} className="play player-icon">
                                    <img src={playerPlay} className="player-icon-el" alt="play"/>
                                </button>
                                <button onClick={pauseMusic} className="pause player-icon">
                                    <img src="https://img.icons8.com/ios-glyphs/35/FFFFFF/pause--v1.png"
                                         className="player-icon-el" alt="pause"/>
                                </button>
                                <button onClick={nextSong} className="play-next player-icon">
                                    <img src={playerForward} className="player-icon-el" alt="next"/>
                                </button>
                            </div>
                            <div className="play-list__duration">
                                <div
                                    className="play-list__duration">
                                    {Math.trunc(currentAudioPlay.duration / 60)}:{currentAudioPlay.duration % 60}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="volume-controls">
                        <input className="volume-controls__range"
                               type="range" min={0} max={1} step="any"
                               onChange={changeVolume} value={currentVolume}/>
                        {/*<button className="mute player-icon"></button>*/}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BottomPlayer;