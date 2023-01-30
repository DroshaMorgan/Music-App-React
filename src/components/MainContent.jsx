import React from 'react';
import mainBcgJpg from "./main-bcg.jpg";
import './component.scss';
import {Link} from "react-router-dom";

const MainContent = () => {
    return (
    <div className="main-bcg">
        <div className="main-bcg__blackout">
            <div className="main-bcg__info-block">
                <div className="main-bcg__info-block-top">Откройте для себя новых
                    независимых исполнителей
                </div>
                <Link  to="/artists" className="main-bcg__info-block-middle">Начать</Link>
                <div className="main-bcg__info-block-bottom">Используется Jamendo music API</div>
            </div>
        </div>
    </div>
    );
};

export default MainContent;