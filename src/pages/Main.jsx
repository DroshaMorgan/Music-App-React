import React from 'react';
import '../App.css';
import Navbar from "../components/UI/navbar/Navbar";
import MainContent from "../components/MainContent";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <div className="content">
                <MainContent/>
            </div>

        </div>
    );
};

export default Main;