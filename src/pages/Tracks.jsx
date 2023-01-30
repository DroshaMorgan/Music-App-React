import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/UI/navbar/Navbar";
import '../components/component.scss';
import BottomPlayer from "../components/bottomPlayer";
import playerRewind from "../components/player-rewind.svg";
import playerPlay from "../components/player-play.svg";
import playerForward from "../components/player-forward.svg";
import {AuthContext} from "../context/context";

const Tracks = () => {
    const navigate = useNavigate();

    const API_URL_TRACKS = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&name=';

    const [tracks, setTracks] = useState([]);
    const [bcgTitle, setBcgTitle] = useState([]);
    const [audioPlay, setAudioPlay] = useState(new Audio());
    // const {audioPlay, setAudioPlay} = useContext(AuthContext)
    const [currentAudioPlay, setCurrentAudioPlay] = useState({});
    const [currentTimeAudioPlay, setCurrentTimeAudioPlay] = useState('');
    // const [nextAudioPlay, setNextAudioPlay] = useState();
    // const [oldTrack, setOldTrack] = useState([]);
    const [currentVolume, setCurrentVolume] = useState(0.2);


    const album_name = useParams();
    useEffect(() => {
        getMusics(album_name.id, API_URL_TRACKS);
    }, [])

    async function getMusics(album_name, url) {
        const resp = await fetch(url + album_name);
        const respData = await resp.json();

        respData.results[0].tracks.sort((x, y) => x.position - y.position);
        setTracks(respData.results[0].tracks);

        setBcgTitle(respData.results[0]);
    }

    function transitToArtists() {
        navigate(`/artists`, {replace: true});
        pauseMusic();
    }

    function transitToAlbums(album_name) {
        navigate(`/artists/albums/${album_name}`, {replace: true})
        pauseMusic();
    }

    function pauseMusic() {
        audioPlay.pause();
    }

    function playMusic() {
        audioPlay.play();
    }

    useEffect(() => {
        playMusic();
        audioPlay.volume = (currentVolume);
        audioPlay.ontimeupdate = () => {
            setCurrentTimeAudioPlay(Math.trunc(audioPlay.currentTime))
        };
    }, [audioPlay])

    useEffect(() => {
        if (Math.trunc(audioPlay.currentTime) === Math
            .trunc(audioPlay.duration)) {
            nextSong();
            console.log('отработал');
        }
    }, [currentTimeAudioPlay/*audioPlay.currentTime audioPlay.ended currentTimeAudioPlay*/])
    //
    // useEffect(() => {
    //     console.log(audioPlay);
    //     console.log(oldTrack);
    // }, [oldTrack])

    // useEffect(() => {
    //     console.log(localStorage.getItem("oldTrack"));
    //     console.log(audioPlay);
    //     audioPlay.pause();
    // }, [tracks])

    function changeCurrentTime(e) {
        audioPlay.currentTime = Math.trunc(e.target.value);
        setCurrentTimeAudioPlay(Math.trunc(e.target.value));
    }

    function changeVolume(e) {
        audioPlay.volume = (e.target.value);
        setCurrentVolume((e.target.value));
    }

    function onSongClick(position, infoAlbum) {
        //     bottomPlayer.style = `
        // display: flex;
        // `;
        pauseMusic();
        const currentSong = tracks.find((el) => el.position === position);
        setCurrentAudioPlay(currentSong)

        const audioList = document.querySelector('.play-list');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        audioList.children[position - 1].classList.add('active-song');

        setAudioPlay(new Audio(currentSong.audio));

        // localStorage.setItem("oldTrack", currentSong.audio);
        // setOldTrack()
        // setOldTrack([audioPlay]);

        // audioPlay.volume = volumeSlider.value;
        // volumizer();
    }

    function nextSong() {
        pauseMusic();

        const audioList = document.querySelector('.play-list');
        const childrenArray = Array.from(audioList.children);
        const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
        let positionNumber = currentSongElement.getAttribute('position');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        if (positionNumber > tracks.length - 1) {
            positionNumber = 1;
        } else {
            positionNumber++;
        }

        const currentSong = tracks
            .find((el) => +el.position === +positionNumber);
        console.log(currentSong);

        audioList.children[positionNumber - 1].classList.add('active-song');

        setCurrentAudioPlay(currentSong)
        setAudioPlay(new Audio(currentSong.audio));
        console.log(audioPlay);
        // audioPlay.volume = volumeSlider.value;
    }

    function prevSong() {
        pauseMusic();

        const audioList = document.querySelector('.play-list');
        const childrenArray = Array.from(audioList.children);
        const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
        let positionNumber = currentSongElement.getAttribute('position');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        if (+positionNumber === 1) {
            positionNumber = tracks.length;
        } else {
            positionNumber--;
        }

        const currentSong = tracks
            .find((el) => +el.position === +positionNumber);
        console.log(currentSong);

        audioList.children[positionNumber - 1].classList.add('active-song');

        setCurrentAudioPlay(currentSong);
        setAudioPlay(new Audio(currentSong.audio));

        // audioPlay.volume = volumeSlider.value;
    }

    return (
        <div>
            <Navbar pauseMusic={pauseMusic}/>
            <div className="content">
                <div style={{zIndex: 10}} onClick={() => {
                    transitToArtists();
                    // pauseMusic();
                }}>Исполнители</div>
                <div style={{zIndex: 10}} onClick={() => {
                    transitToAlbums(album_name.artist);
                    // pauseMusic();
                }}>Альбомы
                </div>
                <div className="band-title-block">

                    <div style={{
                        backgroundImage: `url(${bcgTitle.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "blur(150px)",
                        height: "100%"
                    }}
                         className="band-title-block__bcg">
                    </div>
                    <div className="band-title-block__el">
                        <div className="band-title-block__el__img">
                            <img className="band-title-block__el__img-el" src={bcgTitle.image} alt=""/>
                        </div>
                        <div className="band-title-block__el__album-title">{bcgTitle.name}</div>
                        <div
                            className="band-title-block__el__album-artist-name">Исполнитель: {bcgTitle.artist_name}</div>
                        <div className="band-title-block__el__album-relise-date">{bcgTitle.releasedate}</div>
                    </div>
                </div>

                <div className="play-list">
                    {tracks.map((track) =>
                        <div key={track.name}
                             className="play-list__el"
                             position={track.position}
                             onClick={() => onSongClick(track.position, bcgTitle)}
                        >
                            <div className="play-list__title">
                                {track.position}. {track.name}
                            </div>
                            <div className="play-list__duration">
                                {Math.trunc(track.duration / 60)}:{track.duration % 60}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <BottomPlayer bcgTitle={bcgTitle}
                          currentAudioPlay={currentAudioPlay}
                          currentTimeAudioPlay={currentTimeAudioPlay}
                          changeCurrentTime={changeCurrentTime}
                          nextSong={nextSong}
                          prevSong={prevSong}
                          pauseMusic={pauseMusic}
                          playMusic={playMusic}
                          changeVolume={changeVolume}
                          currentVolume={currentVolume}
            />
        </div>
    );
};

export default Tracks;