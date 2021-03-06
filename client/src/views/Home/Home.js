import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ImageGrid from "../ImageGrid/ImageGrid.js";
import InfoTab from "../InfoTab/InfoTab";
import { Container, Grid, Button, Header, Icon, Card } from "semantic-ui-react";

function Home(props) {
  
 

    return (
      <div className="main-container">
        
        <Grid doubling columns={2}>
          
          <Grid.Column width={2} floated='left'>
          <InfoTab
          atHome={true}
          />
          </Grid.Column>
          <Grid.Column width={14} floated ='right'> 
          
          <ImageGrid adminView={false}/>
          </Grid.Column>
          
          
            
    
          
        </Grid>
        
      
      
      </div>
    );
  }



export default Home;
