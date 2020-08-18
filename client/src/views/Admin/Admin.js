import React, { useState } from 'react';
import './Admin.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Grid, Button, Header, Icon, Card } from "semantic-ui-react";

function Home(props) {
  const [goToCreateWork, setGoToCreateWork] = useState(false);

  const openCreateWork = () => {
    setGoToCreateWork(true);
  }

  if (goToCreateWork) {
    return <Redirect to="/createWork" />;
  }
  //props.adminView
 

    return (
      <div className="main-container">
        <Container className="container">
        <Grid centered>
          <Grid.Row>
            <Button onClick={openCreateWork}>Create Work</Button>
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
