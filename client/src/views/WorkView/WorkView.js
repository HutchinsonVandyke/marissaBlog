import React, { useState } from 'react';
import axios from 'axios';
import InfoTab from "../InfoTab/InfoTab";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Container, Grid, Button, Header, Icon, Modal } from "semantic-ui-react";



//still got to figure out embedding the apple music shit, edit work, and delete work
//button if admin!
const WorkView = (props) => {
    const [gotWorkData, setGotWorkData] = useState(false);
    const [workData, setWorkData] = useState(null);
    const [image, setImage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [deleteWork, setDeleteWork] = useState(false);
    const [updateWork, setUpdateWork] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [workDeleted, setWorkDeleted] = useState(false);
    const [goToEditWork, setGoToEditWork] = useState(false)
    //so will need to make a modal for the delete button
    //so ppl dont just delete whoopsy fucking do
    //also edit will take them to a version of createWork
    //but it is editWork and then it just has same layout
    //w pre-filled it labels and then it does a put req...easy

    const Delete = () => {
        CloseDeleteModal();
        setDeleteWork(true)
    }

    const OpenEditWork = () => {
        setGoToEditWork(true);
    }

    if (goToEditWork) {
        return <Redirect to={{pathname: "/editWork",
                            state: {workData: workData}}}/>;
    }

    const Update = () => {
        setUpdateWork(true);
    }

    if (workDeleted) {
        return <Redirect to="/admin"/>;   
    }

    if (deleteWork) {
        
            axios.delete(`http://localhost:5000/work/${props.match.params.id}`,  {
                headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
            })
            .then((response) =>{
                alert("You have deleted this work")
                setWorkDeleted(true);
            })
            .catch((error) => {
                if (error.response) {
                    return { error: error.response.data.error };
                  }
                  return {
                    error: "Unable to delete for some reason, text hutch"
                  };
            });
        
    }
      

    if (props.location.state.isAdmin == true && isAdmin == false) {
        setIsAdmin(true);
    }
    
    const OpenDeleteModal = () => {
        setShowDeleteModal(true);
    }
    
    const CloseDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const getWorkData = async () => {
        axios.get(`http://localhost:5000/work/${props.match.params.id}`)
        .then((response) =>{
            setWorkData(response.data);
            setImage(response.data.images[0]);
            setGotWorkData(true);
            return;
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

    if (!gotWorkData) {
        getWorkData();
    }  

    if (gotWorkData && isAdmin == true) {
    return (
        <div>
            <Grid columns={3}> 
          
            <Grid.Column width={2}>
                <InfoTab/>
            </Grid.Column>
            <Grid.Column width={12}> 
                
                <img src={image} 
                style={{
                paddingTop: 25,    
                maxWidth: '100%',
                height: 'auto',}}
                />

                <Button icon labelPosition = 'left' floated='right'
                onClick={() => OpenEditWork()}
                >
                    Edit Work
                    <Icon name='add'/>
                </Button>
                <Button icon labelPosition = 'left' floated='right' red
                onClick={() => OpenDeleteModal()}
                >
                    Delete Work 
                    <Icon name='trash'/>
                </Button>

                <p style={{
                padding: 25,
                fontFamily:'consolas',
                fontSize:'200%'
                }}
                >{workData.description}</p>

                <p><iframe 
                width='900'
                frameBorder='0'
                src={workData.text}></iframe></p>
            </Grid.Column>
            <Grid.Column width={2}>
            <p style={{
                paddingLeft:25,
                paddingRight:25,
                paddingTop:25,
                fontFamily:'consolas',
                fontSize:'150%'
                }}
                >{workData.name}</p>
                <p style={{
                paddingLeft:25,
                paddingRight:25,
                fontFamily:'consolas',
                fontSize:'150%'
                }}
                >{workData.date}</p>

                
            </Grid.Column>
            <Modal open={showDeleteModal}
          onClose={CloseDeleteModal}
          closeIcon
          centered
          mini
        >
          <Header> Are you sure? </Header>
          <Modal.Actions>
          <Button basic color ='red'
              onClick={() => Delete()}
            >
                <Icon name='remove'/>
              Yes, delete that shit
          </Button>
            <Button basic color ='green'
              onClick={() => CloseDeleteModal()}
            >
                <Icon name='arrow left'/>
              No, don't delete
          </Button>
          </Modal.Actions>
        </Modal>
          </Grid>
        </div>
    )
            }
    else if (gotWorkData && isAdmin == false) {
    return (
        <div>
            <Grid columns={3}> 
          
            <Grid.Column width={2}>
                <InfoTab/>
            </Grid.Column>
            <Grid.Column width={12}> 
                <img src={image} 
                style={{
                paddingTop: 25,    
                maxWidth: '100%',
                height: 'auto',}}
                />
                <p style={{
                padding: 25,
                fontFamily:'consolas',
                fontSize:'200%'
                }}
                >{workData.description}</p>
                <p><iframe 
                width='900'
                frameBorder='0'
                src={workData.text}></iframe></p>
            </Grid.Column>
            <Grid.Column width={2}>
            <p style={{
                paddingLeft:25,
                paddingRight:25,
                paddingTop:25,
                fontFamily:'consolas',
                fontSize:'150%'
                }}
                >{workData.name}</p>
                <p style={{
                paddingLeft:25,
                paddingRight:25,
                fontFamily:'consolas',
                fontSize:'150%'
                }}
                >{workData.date}</p>
            </Grid.Column>

          </Grid>
        </div>
    )
            }
        
    else {
        return (
            <div/>
        )
    }
}

export default WorkView;