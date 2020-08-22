import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const InfoTab = () => {
    const [goHome, setGoHome] = useState(false);
    const [goBio, setGoBio] = useState(false);

    const goToHome = () => {
        setGoHome(true);
    }

    if(goHome) {
        return <Redirect to="/Home"/>
    }
    
return(
    <div>
        <p style={
            {paddingTop:25,
            paddingLeft:25,
            paddingBottom:0,
            fontFamily:'consolas',
            fontSize:'200%',
            cursor: 'pointer'
            }

        }
        onClick={() => goToHome()}
        >Marissa <br/>Derrick</p>
        <p style={{ paddingLeft:25,
                    fontFamily:'consolas', 
                    fontSize:'160%',
                    cursor: 'pointer'}}
                    onClick={() => goToHome()}
                    
                    >Work </p>
        <p style={{paddingLeft:25, fontFamily:'consolas', fontSize:'160%'}}>Bio</p>
        <p style={{paddingLeft:25, fontFamily:'consolas', fontSize:'160%'}}>CV</p>
    </div>
)
}

export default InfoTab;