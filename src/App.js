import React, {useEffect, useState} from "react";
import './switcher.scss';
import Header from "./components/pages/Header.jsx";
import Footer from "./components/pages/Footer.jsx";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FirstPage from "./components/pages/FirstPage";
import PlayerLogin from "./components/players/PlayerLogin";
import AuthenticatedRoute from "./components/pages/AuthenticatedRoute";
import Logout from "./components/pages/Logout";
import ClubsList from "./components/clubs/ClubsList";
import Welcome from "./components/pages/Welcome";
import Error from "./components/pages/Error";
import ClubOwnersPage from "./components/clubs/ClubOwnersPage";
import PlayerPage from "./components/players/PlayerPage";
import PlayerDetailsPage from "./components/players/PlayerDetailsPage";
import PlayerRegister from "./components/players/PlayerRegister";
import ClubLogin from "./components/clubs/ClubLogin";
import ClubRegister from "./components/clubs/ClubRegister";
import PlayerRegisterSuccessful from "./components/players/PlayerRegisterSuccessful";
import ClubRegisterSuccessful from "./components/clubs/ClubRegisterSuccessful";
import GamesList from "./components/games/GamesList";
import ClubDetailsPage from "./components/clubs/ClubDetailsPage";
import GameComponent from "./components/games/GameComponent";

function App() {

    //state
    const [colorTheme, setColorTheme] = useState('theme-white');

    // effect
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color');
        if (currentThemeColor) {
            setColorTheme(currentThemeColor);
        }
    }, []);

    // set theme
    const handleClick = (theme) => {
        setColorTheme(theme);
        localStorage.setItem('theme-color', theme);
    }

    return (
        <div className={`App ${colorTheme}`}>
            <Router>
                <>
                    <Header/>

                        <div className='theme-options'>
                            <div id='theme-white'
                                 onClick={() => handleClick('theme-white')}
                                 className={`${colorTheme === 'theme-white' ? 'active' : ''}`}
                            >🌞
                            </div>
                            <div id='theme-black'
                                 onClick={() => handleClick('theme-black')}
                                 className={`${colorTheme === 'theme-black' ? 'active' : ''}`}
                            >🌙
                            </div>
                            <div id='theme-pink'
                                 onClick={() => handleClick('theme-pink')}
                                 className={`${colorTheme === 'theme-pink' ? 'active' : ''}`}
                            >🎀
                            </div>
                        </div>

                        <div className='content-box'>
                            <Switch>
                                <Route path="/" exact component={FirstPage} />
                                <Route path="/playerLogin" component={PlayerLogin} />
                                <Route path="/playerRegister" component={PlayerRegister} />
                                <AuthenticatedRoute path="/logout" component={Logout} />
                                <Route path="/clubs" component={ClubsList} />
                                <Route path="/playerPage" component={PlayerPage} />
                                <Route path="/clubOwner" component={ClubOwnersPage} />
                                <Route path="/clubLogin" component={ClubLogin} />
                                <Route path="/clubRegister" component={ClubRegister} />
                                <Route path="/registerSuccessful" component={PlayerRegisterSuccessful} />
                                <Route path="/clubRegisterSuccessful" component={ClubRegisterSuccessful} />
                                <AuthenticatedRoute path="/playerDetailsPage" component={PlayerDetailsPage} />
                                <AuthenticatedRoute path="/clubDetailsPage" component={ClubDetailsPage} />
                                <AuthenticatedRoute exact path="/welcome/:name" component={Welcome} />
                                <AuthenticatedRoute exact path="/games" component={GamesList} />
                                <AuthenticatedRoute exact path="/games/:id" component={GameComponent} />
                                <Route path="*" component={Error} />
                            </Switch>
                        </div>

                    <Footer />
                </>
            </Router>
        </div>
    );
}

export default App;
