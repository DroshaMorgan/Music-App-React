import Main from "../pages/Main";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import Tracks from "../pages/Tracks";

export const privateRoutes = [
    { path: "/artists", element: <Artists/>, exact: true },
    { path: "/artists/albums/:id", element: <Albums/>, exact: true },
    { path: "/artists/albums/:artist/:id", element: <Tracks/>, exact: true },
    { path: "/music-app-react", element: <Main/>, exact: true },
    { path: "/", element: <Main/>, exact: true },
];