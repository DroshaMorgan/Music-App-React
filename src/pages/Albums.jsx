import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/UI/navbar/Navbar";
import noImgArtist from "./assets/imgs/no-img-artist.jpg";
import Tracks from "./Tracks";
import Loader from "../Loader/Loader";
import artistSvg from "../components/UI/navbar/artists.svg";

const Albums = () => {
        const navigate = useNavigate();

        const API_URL_ALBUM = 'https://api.jamendo.com/v3.0/albums/?client_id=e1ba0143&format=jsonpretty&artist_name=';

        const [albums, setAlbums] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

        const artist_name = useParams();

        useEffect(() => {
            getAlbums(artist_name.id, API_URL_ALBUM);
        }, [])

        async function getAlbums(artist, url) {
            try {
                setIsLoading(true)
                const respAlb = await fetch(url + artist);
                const respDataAlb = await respAlb.json(); // БД в формате json
                setAlbums(respDataAlb.results);
            } catch (e) {
                console.log(e.message)
            } finally {
                setTimeout(setIsLoading, 500, false);
            }
        }

        function transitToTracks(artist_name, album_name) {
            navigate(`/artists/albums/${artist_name}/${album_name}`, {replace: true})
        }

        function transitToArtists() {
            navigate(`/artists`, {replace: true})
            // navigate(-1)
        }

        return (
            <div>
                <Navbar/>
                <div className="content">
                    <div className="backButton" onClick={() => transitToArtists()}>
                        {/*<img src={artistSvg} alt=""/>*/}
                        <span>Назад</span>
                    </div>
                    {!isLoading &&
                    <div className="albums-block-all">
                        {albums.map((album) =>
                            <div
                                onClick={() => transitToTracks(album.artist_name, album.name)}
                                key={album.name}
                                className={`album-block-cart ${album.artist_name}`}
                                id={album.name}
                            >
                                <img className="album-block-cart__img" width="100" src={album.image} alt=""/>
                                <div className="play-list__title album-block-cart__name">Альбом: {album.name}</div>
                            </div>
                        )}
                    </div>
                    }
                    {isLoading &&
                    <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                    }
                </div>
            </div>
        );
    }
;

export default Albums;