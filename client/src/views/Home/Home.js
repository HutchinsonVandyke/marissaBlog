import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Container, Grid, Header, Icon, Card } from "semantic-ui-react";

function Home(props) {

  //props.adminView
  if (props.adminView == true) {
    console.log("penis")
  }
  else {
    console.log("fuck!")
  }

    return (
      <div className="main-container">
        <Container className="container">
        <Grid centered>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
           
          </Grid.Row>
          <Grid.Row className="LeftTab">
            
          </Grid.Row>
          <Grid.Row>
           
        
          </Grid.Row>
        </Grid>
      </Container>

      </div>
    );
  }



export default Home;
