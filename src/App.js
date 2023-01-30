import './App.css';
import './normalize.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {privateRoutes} from "./router/Router";
import {useState} from "react";
import {AuthContext} from "./context/context";

function App() {
    const [audioPlay, setAudioPlay] = useState(new Audio());
    return (
        <div className="App">
            <AuthContext.Provider value={{
                audioPlay,
                setAudioPlay
            }}>
                <BrowserRouter>
                    {/*<Navbar/>*/}
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route key={route.element} exact={route.exact}
                                   path={route.path}
                                   element={route.element}/>
                        )}
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
