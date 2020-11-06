import React from 'react';
const validation = (props) =>{
    let ValMsg = 'Text too short';
    if (props.inputLength >= 5) {
        ValMsg = 'Text long enough';
    }
    return(
        <div>
            <p>{ValMsg}</p>
        </div>
    );
}

export default validation