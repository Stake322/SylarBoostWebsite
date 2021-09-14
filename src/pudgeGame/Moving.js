import React from "react";
import hook from "./resources/img/hook.png";
import {motion, useAnimation} from "framer-motion";


export default function Moving() {

    const control = useAnimation();

    return (
        <div>

            <motion.img src={hook}
            animate={control}
            style={{width:"20%"}}/>
        </div>
    )
}
