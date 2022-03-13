import React from "react";
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
import AccsLayout from "./accounts/AccsLayout.js";
import MainPudgeLayout from "./pudgeGame/MainPudgeLayout.js"

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
                        <AccsLayout />
                    </Route>
                    <Route exact path="/pudge">
                        <MainPudgeLayout />
                    </Route>


                </Switch>

                <BottomBar />
            </>
        </Router>
    );
}

export default App;