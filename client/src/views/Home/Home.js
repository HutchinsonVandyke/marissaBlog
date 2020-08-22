import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ImageGrid from "../ImageGrid/ImageGrid.js";
import InfoTab from "../InfoTab/InfoTab";
import { Container, Grid, Button, Header, Icon, Card } from "semantic-ui-react";

function Home(props) {
  
 

    return (
      <div className="main-container">
        
        <Grid>
          
          <Grid.Column width={3} floated='left'>
          <InfoTab/>
          </Grid.Column>
          <Grid.Column width={13} floated ='right'> 
          
          <ImageGrid adminView={false}/>
          </Grid.Column>
          
          
            
    
          
        </Grid>
        
      
      
      </div>
    );
  }



export default Home;
