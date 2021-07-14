import React, {useEffect, useState} from "react";
import './switcher.scss';
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.css";

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
                <Home/>
            </div>

            <Footer />
        </div>
    );
}

export default App;
