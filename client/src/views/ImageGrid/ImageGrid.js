import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WorkView from '../WorkView/WorkView'
import { Route, Switch, Redirect, Link  } from 'react-router-dom';
import {Image} from 'semantic-ui-react'

const ImageGrid = (props) => {
    //im grabbing whole works...need to just get works
    const [works, setWorks] = useState(null)
    const [gotWorks, setGotWorks] = useState(false);
    const [workClicked, setWorkClicked] = useState(null);
    const [workIsClicked, setWorkIsClicked] = useState(false)

    useEffect(() => {
        setWorks(getImages());
    }, []);


    const openWorkView = (workData) => {
       setWorkClicked(workData);
       setWorkIsClicked(true);
       
    }

     if (workIsClicked && workClicked != null) {
        return <Redirect 
        push to={{pathname: `/viewWork/${workClicked._id}`,
            state: {isAdmin: props.adminView}
            }}
        />
    } 
    
    const getImages = () => {
        axios.get("http://localhost:5000/work/")
        .then((response) =>{
            let copy = [];
            for (let i = 0; i < response.data.length; i++) {
                copy.push(response.data[i]);
            }
            setWorks(copy);
            setGotWorks(true);
            return copy;
        })
        .catch((error) => {
            if (error.response) {
                return { error: error.response.data.error };
              }
              return {
                error: "Unable to upload to database!"
              };
        });
    }
    
   


    let grid;
    if (works != null) {
        
        grid = works.map(function(curWork) {
            
            return (
                
                <img
                
                className="workCard"
                src ={curWork.images[0]}
                onClick={() => openWorkView(curWork)}
                style={{
                    cursor: 'pointer',
                    maxWidth: '33%',
                    height: 'auto',
                    border: '5px white',
                    padding: 5
                }} 
                
                />
                
            );
        })
        return (
            <div style ={{paddingTop:25,
                        paddingBottom:25,
                        paddingRight:25,
                        paddingLeft:15
            }} >
                
                {grid}
                
                </div>
        )
    }
    else {
        
    return (
        <div>
            <img style ={{padding:1}} src ={"https://marissaderrickblog.s3.amazonaws.com/WIN_20200728_19_11_42_Pro"}/>
        </div>
    );
    }
}

export default ImageGrid;