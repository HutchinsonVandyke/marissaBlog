import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import API from "../../../api/baseAPI";
import Cookies from "js-cookie";
import ImageUploader from "../../ImageUploader/ImageUploader"
import FileUploader from "../../FileUploader/FileUploader"
import ImagePreview from "./ImagePreview"
import './CreateWork.css';
import { Container, Grid, Form, Input, Button, Radio, Field, Modal,Icon, GridColumn } from "semantic-ui-react";

const CreateWork = (props) => {
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [images, setImages] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [text, setText] = useState("");
    const [isPhotography, setIsPhotography] = useState(false);
    const [isWriting, setIsWriting] = useState(false);
    const [isPlaylist, setIsPlaylist] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [imageAdded, setImageAdded] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [fileAdded, setFileAdded] = useState(false);
    const [workAdded, setWorkAdded] = useState(false);
    const [cancel, setCancel] = useState(false);

    if (workAdded) {
      alert("Your work has been uploaded and will now show on front page")
      return <Redirect to="/admin" />;
    }

    if (cancel) {
      return <Redirect to="/admin" />;
    }

    const Cancel = () => {
      setCancel(true);
    }


    const addWork = async () => {
      
      let workData = {
        name: name,
        date: date,
        description: description,
        images: images,
        playlist: playlist,
        text: text,
        isPhotography: isPhotography,
        isWriting: isWriting,
        isPlaylist: isPlaylist,
        isOther: isOther
      }
      
      
      API.post("/work/", workData,  {
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
      })
      .then((response) => {
        setWorkAdded(true);
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          return { error: error.response.data.error };
        }
        return {
          error: "Unable to upload to database!"
        };
      });
      
    }

    const addImage = (newImage) => {
      let copy = images;
      copy.push(newImage);
      setImages(copy);
      setImageAdded(true);
      console.log("addImage function end")
      console.log(images)
    }

    const addImageAndMakeCover = (newImage) => {
      let copy = images;
      copy.push(newImage);
      let l = copy.length
      if (copy.length >1 ) {
        let p = copy[0];
        copy[0] = copy[l-1];
        copy[l-1] = p;
      }
      setImages(copy);
      setImageAdded(true);
      console.log("addImage function end")
      console.log(images)
    }

    const deleteImage = () => {
      if (images == undefined || images.length == 0) {
        return alert("There was no image to delete...weird maybe you did something dumb")
      }
      let copy = images;
      copy.pop();
      setImages(copy);
    }

    const OpenPhotoModal = () => {
        setShowPhotoModal(true);
    }
    
    const ClosePhotoModal = () => {
        setShowPhotoModal(false);
    }

    const OpenFileModal = () => {
      setShowFileModal(true);
  }
  
  const CloseFileModal = () => {
      setShowFileModal(false);
  }

    return (
        <div className="main-container">
          <Container className="container">
          <Grid centered>
            <Grid.Row>
              <Form>
              <p>Create a new work to display on your page, bitch</p>
              <Form.Group widths="equal">
                <Form.Field
                    control={Input}
                    label="Name"
                    placeholder="Name"
                    fluid
                    value={name}
                    required = {true}
                    onChange={(event) => setName(event.target.value)}
                />
                <Form.Field
                    control={Input}
                    label="Date Created"
                    placeholder="mm/dd/yyyy"
                    fluid
                    value={date}
                    required = {true}
                    onChange={(event) => setDate(event.target.value)}
                />
                </Form.Group>
               <Form.Group inline>
                <label>Type</label>
                <Form.Field
                    control={Radio}      
                    label='Playlist'
                    value='Playlist'
                    checked={setIsPlaylist}
                    
                />
                <Form.Field
                    control={Radio} 
                    label='Writing'
                    value='Writing'
                    checked={setIsWriting}
                
                />
                <Form.Field
                    control={Radio}   
                    label='Photography'
                    value='Photography'
                    checked={setIsPhotography}
                    
                />
                <Form.Field
                    control={Radio} 
                    label='Other/Combination'
                    value='Combination'
                    checked={setIsOther}
                    
                />
                </Form.Group>
                <Form.Group widths="equal">
                <Form.Field
                    control={Input}
                    label="Description"
                    placeholder="This will be a short description that users will see"
                    fluid
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                </Form.Group>
                <Form.Group widths="equal">
                <Form.Field
                    control={Input}
                    label="Playlist, do copy embed code, then just put playlist url no quotes"
                    placeholder="Apple music playlist url"
                    value={playlist}
                    fluid
                    onChange={(event) => setPlaylist(event.target.value)}

                />
                </Form.Group>
                <Form.Group widths="equal">
                <label><b>Text and Photo(s) Upload</b></label>
               
                </Form.Group>
                <Form.Group widths="equal">
                <Button onClick={OpenFileModal} color = 'green'> Upload Text File</Button>  
                <Button onClick={OpenPhotoModal} color = 'blue'> Upload Photo</Button>
                </Form.Group>
                <Form.Group widths = "equal">
                
                <ImagePreview 
                images = {images}
                editMode = {false}
                />
                </Form.Group>
                
                <Form.Group>
                  <Button color = 'yellow' onClick={addWork}> Submit </Button>
                  <Button icon labelPosition= 'right' onClick={() => Cancel()}> Cancel <Icon name="remove"/> </Button>
                </Form.Group>
              </Form>
            </Grid.Row>
            <Grid.Row>
             <Modal open={showPhotoModal}
          onClose={ClosePhotoModal}
          closeIcon
          centered
        >
          <Modal.Header> Photo Upload </Modal.Header>
          <Modal.Content>
            <ImageUploader
            addImage = {addImage}
            imageAdded = {imageAdded}
            setImageAdded = {setImageAdded}
            ClosePhotoModal = {ClosePhotoModal}
            deleteImage = {deleteImage}
            addImageAndMakeCover = {addImageAndMakeCover}
            >

            </ImageUploader>
          </Modal.Content>
          <Modal.Actions>
            <Button grey
              onClick={ClosePhotoModal}
            >
              Done
          </Button>
          </Modal.Actions>
        </Modal>

        <Modal open={showFileModal}
          onClose={CloseFileModal}
          closeIcon
          centered
        >
          <Modal.Header> Text File Upload </Modal.Header>
          <Modal.Content>
            <FileUploader
            setText = {setText}
            fileAdded = {fileAdded}
            setFileAdded = {setFileAdded}
            CloseFileModal = {CloseFileModal}
            //deleteImage = {deleteImage}
            >

            </FileUploader>
          </Modal.Content>
          <Modal.Actions>
            <Button grey
              onClick={CloseFileModal}
            >
              Done
          </Button>
          </Modal.Actions>
        </Modal>
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

export default CreateWork;