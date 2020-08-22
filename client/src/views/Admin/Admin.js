import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import ImageGrid from "../ImageGrid/ImageGrid.js";
import InfoTab from "../InfoTab/InfoTab";
import { Container, Grid, Button, Header, Icon, Card } from "semantic-ui-react";

function Admin(props) {
  const [goToCreateWork, setGoToCreateWork] = useState(false);
  const [goToGuest, setGoToGuest] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [notAdmin, setNotAdmin] = useState(false);

  useEffect(() => {
    verifyAdmin().then(verified => {
      if (verified) {
        setVerified(true);
      }
      else {
        setNotAdmin(true);
      }
    })
  }, []);


  const verifyAdmin = async () => {
      let axiosResponse = await axios.get("http://localhost:5000/admin/verify", {
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
      })
        .then(async response => {
          if (response.status === 200) {
            return true;
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          return false;
        });
        
      return axiosResponse;
    
  }

  if (notAdmin) {
    return <Redirect to="/Home"/>;
  }

  const openCreateWork = () => {
    setGoToCreateWork(true);
  }


  if (goToCreateWork) {
    return <Redirect to="/createWork" />;
  }

  const openGuestView = () => {
    setGoToGuest(true);
  }

  if (goToGuest) {
    return <Redirect to="/home" />;
  }
  //props.adminView
 

    return (
      <div className="main-container">
        
        <Grid>
          
          <Grid.Column width={3} floated='left'>
          <InfoTab/>
          </Grid.Column>
          <Grid.Column width={13} floated ='right'> 
          <Button icon labelPosition = 'left' floated='right' onClick={openCreateWork}>
            Create New Work
            <Icon name='add'/>
            </Button>
          <Button icon labelPosition = 'left' floated='right' onClick={openGuestView}>
            Guest View 
            <Icon name='home'/>
            </Button>
          <br/>
          <ImageGrid adminView={true}/>
          </Grid.Column>
          
          
            
    
          
        </Grid>
        
      
      
      </div>
    );
  }



export default Admin;
