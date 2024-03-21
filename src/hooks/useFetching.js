import {useState} from "react";

export const useFetching = (url) => {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const fetching = async () => {
        try {
            setIsLoading(true)
            const respArt = await fetch(url);
            const respDataArt = await respArt.json();
            setArtists(respDataArt.results);
        } catch (e) {
            console.log(e.message)
        } finally {
            // setIsLoading(false)
            setTimeout(setIsLoading, 500, false);
        }
    }

    return [fetching, isLoading, artists]
}