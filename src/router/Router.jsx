import Main from "../pages/Main";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import Tracks from "../pages/Tracks";

export const privateRoutes = [
    // { path: "/posts/:id", element: <PostIdPage/>, exact: true },
    // { path: "*", element: <Error/>, exact: true },
    { path: "/artists", element: <Artists/>, exact: true },
    { path: "/artists/albums/:id", element: <Albums/>, exact: true },
    { path: "/artists/albums/:artist/:id", element: <Tracks/>, exact: true },
    { path: "/", element: <Main/>, exact: true },
    // { path: "*", element: <Artists/>, exact: true },
];