import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import noImgArtist from "./assets/imgs/no-img-artist.jpg";
import './pages.scss';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import Loader from "../Loader/Loader";
import BottomPlayer from "../components/bottomPlayer";
import {useFetching} from "../hooks/useFetching";

const Artists = () => {
    const navigate = useNavigate();

    // const API_URL_ARTISTS =
    //     'https://api.jamendo.com/v3.0/artists/?client_id=e1ba0143&format=jsonpretty&fullcount=true&limit=100&name=&offset=38000';
    const API_URL_ARTISTS =
        'https://api.jamendo.com/v3.0/artists/?client_id=e1ba0143&format=jsonpretty&fullcount=true&limit=20&offset=';

    // const [artists, setArtists] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // async function getArtists(url) {
    //     try {
    //         // setTimeout(setIsLoading, 5000, true);
    //         setIsLoading(true);
    //         const respArt = await fetch(url);
    //         const respDataArt = await respArt.json();
    //
    //         setArtists(respDataArt.results);
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    //     finally {
    //       setTimeout(setIsLoading, 500, false);
    //         // setIsLoading(false);
    //     }
    // }

    // const [fetching, isLoading, artists] = useFetching(API_URL_ARTISTS + Math.floor(Math.random() * 48010))
    const [fetching, isLoading, artists] = useFetching(API_URL_ARTISTS)

    useEffect(
        () => {
            fetching()
            // getArtists(API_URL_ARTISTS + Math.floor(Math.random() * 48010));
            // setTimeout(setIsLoading, 3000, false);
            // getArtists(API_URL_ARTISTS);
        }, []);

    function transitToAlbums(artist_name) {
        navigate(`/artists/albums/${artist_name}`, {replace: true})
    }

    return (
        <div>
            <Navbar/>
            <div className="content">
                {!isLoading &&
                <div className="artists-block-all">
                    {artists.map((artist) =>
                        <div onClick={() => transitToAlbums(artist.name)} key={artist.name}
                             className={`artist-block-cart ${artist.name}`} id={artist.name}>
                            {artist.image
                                ? <img className="artist-block-cart__img" width="100" src={artist.image} alt=""/>
                                : <img className="artist-block-cart__img"
                                       width="100" src={noImgArtist} alt=""/>}
                            <div className="artist-block-cart__name">
                                {/*<Link artist={artist} className="artist-block-cart__link" to="/albums">*/}
                                Исполнитель: {artist.name}

                            </div>
                        </div>
                    )}
                </div>
                }
                {isLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                }
            </div>
            {/*<BottomPlayer*/}
            {/*    bcgTitle={bcgTitle}*/}
            {/*    currentAudioPlay={currentAudioPlay}*/}
            {/*    currentTimeAudioPlay={currentTimeAudioPlay}*/}
            {/*    changeCurrentTime={changeCurrentTime}*/}
            {/*    nextSong={nextSong}*/}
            {/*    prevSong={prevSong}*/}
            {/*    pauseMusic={pauseMusic}*/}
            {/*    playMusic={playMusic}*/}
            {/*    changeVolume={changeVolume}*/}
            {/*    currentVolume={currentVolume}*/}
            {/*/>*/}
        </div>
    );
};

export default Artists;