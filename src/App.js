import React, {useEffect, useState} from "react";
import './switcher.scss';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FirstPage from "./components/FirstPage";
import Login from "./components/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";
import Clubs from "./components/Clubs";
import Welcome from "./components/Welcome";
import Error from "./components/Error";

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
                                <Route path="/login" component={Login} />
                                <AuthenticatedRoute path="/logout" component={Logout} />
                                <Route path="/clubs" component={Clubs} />
                                <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
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
