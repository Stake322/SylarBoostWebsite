import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'

const PudgeLogo = () => (
    
  <Reveal animated='small fade'>
    <Reveal.Content visible>
      <Image src='https://lh3.googleusercontent.com/proxy/H9Ba1ZYyuGfTxL1FV5rKmseiWcoHnd_lkUrMIbuqwZv5FrvgS_ng5pLP_87q_n_Cn0G9hUSFCmgJgRu1M0cf-RbkeN_-VioIBCMlreM' size='small' />
    </Reveal.Content>
    <Reveal.Content hidden>
      <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLX21EMb9BF2dldaruEx2N-TlQT8rb0D8YLb-AzKr4pEnUscmqvt_3leTn78gvTQDkM0&usqp=CAU' size='small' />
    </Reveal.Content>
  </Reveal>
)

export default PudgeLogo
