import React from "react";
import PudgeCore from "./PudgeCore";
import { Grid, Image } from 'semantic-ui-react'
const MainPudgeGame = () => {
    return (
        <div>
    
            <Grid>
                    <Grid.Column width={16}>
                        <PudgeCore />
                    </Grid.Column>
            </Grid>
        </div>
    )
}
export default MainPudgeGame;