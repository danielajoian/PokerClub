import React, {useEffect, useState} from "react";
// import './switcher.scss';
// import './switch.scss';

import './App.css';
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
import GameComponentCreate from "./components/games/GameComponentCreate";
import PlayerAccount from "./components/players/PlayerAccount";
import ClubAccount from "./components/clubs/ClubAccount";
import ClubInfo from "./components/clubs/ClubInfo";
import GameDetails from "./components/games/GameDetails";
import PlayerDeletedSuccessful from "./components/players/PlayerDeletedSuccessful";
import ClubDeletedSuccessful from "./components/clubs/ClubDeletedSuccessful";
import ClubsListByCity from "./components/clubs/ClubsListByCity";
import PlayerDeleteModal from "./components/players/PlayerDeleteModal";
import ClubDeleteModal from "./components/clubs/ClubDeleteModal";
import GameDeleteModal from "./components/games/GameDeleteModal";
import GamePrivateComponent from "./components/games/GamePrivateComponent";
import GamePrivateDetails from "./components/games/GamePrivateDetails";
import GamePrivateDeleteModal from "./components/games/GamePrivateDeleteModal";
import PlayerPrivateGame from "./components/players/PlayerPrivateGame";
import PlayerPrivateGameList from "./components/players/PlayerPrivateGameList";
import PlayerRegisterAddImage from "./components/players/PlayerRegisterAddImage";
import ClubRegisterAddImage from "./components/clubs/ClubRegisterAddImage";
import GameComponentUpdate from "./components/games/GameComponentUpdate";
import GameDeleteSuccessful from "./components/games/GameDeleteSuccessful";
import GamePrivateDeleteSuccessful from "./components/games/GamePrivateDeleteSuccessful";
import ClubForgotPassword from "./components/clubs/ClubForgotPassword";
import PlayerForgotPassword from "./components/players/PlayerForgotPassword";
import ClubForgotPasswordUsername from "./components/clubs/ClubForgotPasswordUsername";
import PlayerForgotPasswordUsername from "./components/players/PlayerForgotPasswordUsername";

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
                            <div id='theme-pumpkin'
                                 onClick={() => handleClick('theme-pumpkin')}
                                 className={`${colorTheme === 'theme-pumpkin' ? 'active' : ''}`}
                            >🎃
                            </div>
                        </div>

                        <div className='content-box'>
                            <Switch>
                                <Route path="/" exact component={FirstPage} />
                                <Route path="/playerLogin" component={PlayerLogin} />
                                <Route path="/playerRegister" component={PlayerRegister} />
                                <Route path="/playerRegisterAddImage/:name" component={PlayerRegisterAddImage} />
                                <Route path="/clubRegisterAddImage/:name" component={ClubRegisterAddImage} />
                                <Route path="/logout" component={Logout} />
                                <Route exact path="/clubs" component={ClubsList} />
                                <Route path="/playerPage" component={PlayerPage} />
                                <Route path="/clubOwner" component={ClubOwnersPage} />
                                <Route exact path="/clubs/:name" component={ClubInfo} />
                                <Route path="/clubLogin" component={ClubLogin} />
                                <Route path="/clubRegister" component={ClubRegister} />
                                <Route path="/registerSuccessful" component={PlayerRegisterSuccessful} />
                                <Route path="/clubRegisterSuccessful" component={ClubRegisterSuccessful} />
                                <Route exact path="/games/:id/details" component={GameDetails} />
                                <Route exact path="/clubForgotPassword/:name" component={ClubForgotPassword} />
                                <Route exact path="/clubForgotPasswordUsername" component={ClubForgotPasswordUsername} />
                                <Route exact path="/playerForgotPassword/:name" component={PlayerForgotPassword} />
                                <Route exact path="/playerForgotPasswordUsername" component={PlayerForgotPasswordUsername} />
                                <AuthenticatedRoute exact path="/privateGames/:id/details" component={GamePrivateDetails} />
                                <AuthenticatedRoute exact path="/clubsListByCity/:name" component={ClubsListByCity} />
                                <AuthenticatedRoute exact path="/deletedSuccessful" component={PlayerDeletedSuccessful} />
                                <AuthenticatedRoute exact path="/clubDeletedSuccessful" component={ClubDeletedSuccessful} />
                                <AuthenticatedRoute path="/playerDetailsPage" component={PlayerDetailsPage} />
                                <AuthenticatedRoute path="/playerPrivateGame" component={PlayerPrivateGame} />
                                <AuthenticatedRoute path="/playerPrivateGameList/:id" component={PlayerPrivateGameList} />
                                <AuthenticatedRoute path="/playerDeleteModal" component={PlayerDeleteModal} />
                                <AuthenticatedRoute path="/clubDeleteModal" component={ClubDeleteModal} />
                                <AuthenticatedRoute path="/gameDeleteModal/:id" component={GameDeleteModal} />
                                <AuthenticatedRoute path="/gameDeleteSuccessful" component={GameDeleteSuccessful} />
                                <AuthenticatedRoute path="/gamePrivateDeleteSuccessful" component={GamePrivateDeleteSuccessful} />
                                <AuthenticatedRoute path="/gamePrivateDeleteModal/:id" component={GamePrivateDeleteModal} />
                                <AuthenticatedRoute path="/clubDetailsPage" component={ClubDetailsPage} />
                                <AuthenticatedRoute exact path="/welcome/:name" component={Welcome} />
                                <AuthenticatedRoute exact path="/games" component={GamesList} />
                                <AuthenticatedRoute exact path="/playerAccount/:name/:id" component={PlayerAccount} />
                                <AuthenticatedRoute exact path="/clubAccount/:name/:id" component={ClubAccount} />
                                <AuthenticatedRoute exact path="/games/-1" component={GameComponentCreate} />
                                <AuthenticatedRoute exact path="/games/:id" component={GameComponentUpdate} />
                                <AuthenticatedRoute exact path="/privateGames/:id" component={GamePrivateComponent} />
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
