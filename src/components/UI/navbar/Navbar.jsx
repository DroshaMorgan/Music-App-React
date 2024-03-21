import React from 'react';
import artistSvg from "./artists.svg";
import {Link} from "react-router-dom";
import cl from "./Navbar.module.css";

const Navbar = ({pauseMusic}) => {
    return (
        <div>
            <div className={cl.navbar}>
                <div className={cl.navbar__container}>
                    <div /*className={classes.navbar__top-link}*/>
                        <div className={cl.navbar__title}>
                            Music-App
                        </div>
                        <div /*className={classes.navbar__top-link-home-page}*/>
                            <Link onClick={pauseMusic} className={cl.navbar__links} to="/#">Главная</Link>
                        </div>

                    </div>
                    <div className={cl.navbar__middleLink}>
                        <div className={cl.navbar__middleLinkTitle}>
                            Моя коллекция
                        </div>
                        <div className={cl.navbar__linkBlock}>
                            <img src={artistSvg} alt="" /*className={cl.navbar_linkImg}*//>
                                <Link onClick={pauseMusic} to="/artists" className={cl.navbar__links}>Исполнители</Link>
                        </div>

                    </div>

                    {/*<div className={cl.navbar__bottom-link}>*/}
                    {/*    <div className={cl.navbar__linkBlock}>*/}
                    {/*        <img src={settingsSvg} alt="" className={cl.navbar_linkImg}/>*/}
                    {/*            <Link to="/#" className={cl.navbar__links}>Настройки</Link>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    );
};

export default Navbar;