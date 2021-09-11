import React from "react";
import PudgeCore from "./PudgeCore";
import { Grid, Image } from 'semantic-ui-react'
const MainPudgeGame = () => {
    return (
        <div>
            <button> PUDGE</button>
            <button> PUDGE</button>
            <button> PUDGE</button>
            <button> PUDGE</button>
            <button> PUDGE</button>
            <button> PUDGE</button>

            <Grid>
                    <Grid.Column width={13}>
                        <PudgeCore />
                    </Grid.Column>
            </Grid>
        </div>
    )
}
export default MainPudgeGame;