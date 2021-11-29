import React from "react";
import './App.css';
import BottomBar from "./BottomBar.js";
import TopBar from "./Topbar.js"
import MainPage from './MainPage'
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Youtube from "./youtube/Youtube"
import Twitch from "./Twitch.js";
import Boost from "./boost/Boost.js";
import Faq from "./faq/FAQ.js";
import Accs from "./accounts/Accs.js";
import MainPudgeGame from "./pudgeGame/MainPudgeGame";
import PageLayout from "./PageLayout";

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
                    <Route exact path="/page">
                        <PageLayout />
                    </Route>

                </Switch>

                <BottomBar />
            </>
        </Router>
    );
}

export default App;