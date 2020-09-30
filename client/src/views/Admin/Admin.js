import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import API from "../../api/baseAPI";
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
        console.log('verified')
        setVerified(true);
      }
      else {
        console.log('not admin')
        setNotAdmin(true);
      }
    })
  }, []);


  const verifyAdmin = async () => {
    console.log('verify admin called')
      let axiosResponse = await API.get("/admin/verify", {
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
    return <Redirect push to="/createWork" />;
  }

  const openGuestView = () => {
    setGoToGuest(true);
  }

  if (goToGuest) {
    return <Redirect push to="/home" />;
  }
  //props.adminView
 

    return (
      <div className="main-container">
        
        <Grid doubling columns={2}> 
          
          <Grid.Column width={2} floated='left'>
          <InfoTab atHome={false}/>
          </Grid.Column>
          <Grid.Column width={14} floated ='right'> 
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
