import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/UI/navbar/Navbar";
import noImgArtist from "./assets/imgs/no-img-artist.jpg";
import Tracks from "./Tracks";

const Albums = () => {
        const navigate = useNavigate();

        const API_URL_ALBUM = 'https://api.jamendo.com/v3.0/albums/?client_id=e1ba0143&format=jsonpretty&artist_name=';

        const [albums, setAlbums] = useState([]);


        const artist_name = useParams();
        // console.log(artist_name.id)

        useEffect(() => {
            getAlbums(artist_name.id, API_URL_ALBUM);
        }, [])

        async function getAlbums(artist, url) {
            const respAlb = await fetch(url + artist);
            const respDataAlb = await respAlb.json(); // БД в формате json

            // console.log(respDataAlb.results)
            setAlbums(respDataAlb.results);
            // renderAlbums(respDataAlb.results);
        }

        function transitToTracks(artist_name, album_name) {
            navigate(`/artists/albums/${artist_name}/${album_name}`, {replace: true})
            // console.log(artist_name)
        }

    function transitToArtists() {
        navigate(`/artists`, {replace: true})
        // console.log(artist_name)
    }

        // console.log(albums);
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <div onClick={() => transitToArtists()}>Исполнители</div>
                    <div className="albums-block-all">
                        {albums.map((album) =>
                            <div onClick={() => transitToTracks(album.artist_name, album.name)} key={album.name}
                                 className={`album-block-cart ${album.artist_name}`}
                                 id={album.name}>
                                <img className="album-block-cart__img" width="100" src={album.image} alt=""/>
                                <div className="play-list__title album-block-cart__name">Альбом: {album.name}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
;

export default Albums;