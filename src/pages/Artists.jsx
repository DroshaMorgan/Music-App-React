import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import noImgArtist from "./assets/imgs/no-img-artist.jpg";
import './pages.scss';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Artists = () => {
    const navigate = useNavigate();

    const API_URL_ARTISTS = 'https://api.jamendo.com/v3.0/artists/?client_id=e1ba0143&format=jsonpretty&fullcount=true&limit=100&name=&offset=38000';

    const [artists, setArtists] = useState([]);

    // console.log(artists);

    async function getArtists(url) {
        const respArt = await fetch(url);
        const respDataArt = await respArt.json();

        setArtists(respDataArt.results);
        // console.log(respDataArt);
        // renderArtists(respDataArt.results);
    }

    useEffect(
        () => {
            getArtists(API_URL_ARTISTS);
        }
        , []);

    function transitToAlbums(artist_name) {
        navigate(`/artists/albums/${artist_name}`, { replace: true })
        // console.log(artist_name)
    }

    return (
        <div>
            <Navbar/>
            <div className="content">

                <div className="artists-block-all">
                    {artists.map((artist) =>
                        <div onClick={()=>transitToAlbums(artist.name)} key={artist.name} className={`artist-block-cart ${artist.name}`} id={artist.name}>
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
            </div>
        </div>
    );
};

export default Artists;