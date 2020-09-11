import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const InfoTab = (props) => {
    const [goHome, setGoHome] = useState(false);
    const [goBio, setGoBio] = useState(false);

    const goToHome = () => {
        setGoHome(true);
    }
    console.log(props)
    if(goHome) {
        if (props.atHome) {
            return setGoHome(false);
        }
        else {
            
        return <Redirect push to="/Home"/>
        }
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
                    
                    >Works </p>
        <p style={{paddingLeft:25, fontFamily:'consolas', fontSize:'160%', cursor: 'pointer'}}>Bio</p>
        <p style={{paddingLeft:25, fontFamily:'consolas', fontSize:'160%', cursor: 'pointer'}}>CV</p>
    </div>
)
}

export default InfoTab;