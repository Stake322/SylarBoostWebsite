import React from 'react'
import { Icon, Step, Grid } from 'semantic-ui-react';

const StepExampleVertical = (props) => {
    return (
        <Grid >
            <Grid.Column >
                <Step.Group size="large" fluid vertical>
                    <Step completed={props.step >= 0} active={props.step >= 0}>
                        <Icon name='calculator' />
                        <Step.Content>
                            <Step.Title>1 ШАГ</Step.Title>
                            <Step.Description>РАССЧИТАЙТЕ СТОИМОСТЬ</Step.Description>
                        </Step.Content>
                    </Step>
                    <Step completed={props.step >= 1} active={props.step >= 1}>
                        <Icon name='bell' />
                        <Step.Content>
                            <Step.Title>2 ШАГ</Step.Title>
                            <Step.Description>ПОДГОТОВЬТЕ ДАННЫЕ</Step.Description>
                        </Step.Content>
                    </Step>
                    <Step completed={props.step >= 2} active={props.step >= 2}>
                        <Icon name='compose' />
                        <Step.Content>
                            <Step.Title>3 ШАГ</Step.Title>
                            <Step.Description>СВЯЖИТЕСЬ СО МНОЙ</Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Grid.Column>
        </Grid>
    )
}

export default StepExampleVertical;