import React from "react";
import './App.css';
import BottomBar from "./BottomBar.js";
import TopBar from "./MainPage/Topbar/Topbar.js"
import MainPage from './MainPage/MainPage.js'
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Youtube from "./youtube/YoutubeDesktop"
import Twitch from "./Twitch.js";
import Boost from "./boost/Boost.js";
import Faq from "./faq/FAQ.js";
import Accs from "./accounts/Accs.js";
import MainPudgeGame from "./pudgeGame/MainPudgeGame";

function App() {
    return (
        <Router>
            <>
                <TopBar />
          
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/youtube">
                        <Youtube />
                    </Route>
                    <Route exact path="/twitch">
                        <Twitch />
                    </Route>
                    <Route exact path="/boost">
                        <Boost />
                    </Route>
                    <Route exact path="/faq">
                        <Faq />
                    </Route>
                    <Route exact path="/accounts">
                        <Accs />
                    </Route>
                    <Route exact path="/pudge">
                        <MainPudgeGame />
                    </Route>
                 

                </Switch>

                <BottomBar />
            </>
        </Router>
    );
}

export default App;