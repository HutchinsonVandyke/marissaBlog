import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react'
import Image from 'semantic-ui-react'
import { PromiseProvider } from 'mongoose';
import './ImageUploader.css';



const ImageUploader = (props) => {
  
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadInput, setUploadInput] = useState(null) 

  const deletePhoto = () => {
    props.deleteImage();
    setSuccess(false);
    setUrl("");
  }

  const addPhoto = () => {
    props.addImage(url);
    props.ClosePhotoModal()
  }

  const addCover = () => {
    props.addImageAndMakeCover(url);
    props.ClosePhotoModal()
  }

  const handleChange = (ev) => {
    //this.setState({success: false, url : ""});
    setSuccess(false);
    setUrl("");
    
  }
  // Perform the upload
  const handleUpload = (ev) => {
    let file = uploadInput.files[0];
    if (file == undefined) {
      return;
  }
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    if (fileType != 'jpg' && fileType != 'png' && fileType != 'jpeg') {
      alert('Please upload a photo of type: jpg, jpeg, png')
      return;
    }
    //console.log("Preparing the upload");
     axios.post("http://localhost:5000/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var urlData = returnData.url;
      //this.setState({url: url})
      setUrl(urlData)
      //console.log("Recieved a signed request " + signedRequest);
     // Put the fileType in the headers for the upload
      var options = {
         headers: {
          'Content-Type': fileType,
        } 
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        //console.log("Response from s3")
        //this.setState({success: true});
        setSuccess(true);
      })
      .catch(error => {
        console.log("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    }) 
  }
  
  
  
    if (success) {
      //console.log(url)
      //console.log('here')
      //console.log('props.imgadded is ' + props.imageAdded)
      //debug stuff^
      //if(!props.imageAdded) {

      return(
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>Image Preview</h3>
        <Button href={url}>Access photo in other window</Button>
        <Button onClick={() => {addPhoto()}}> Add photo to work!</Button>
        <Button onClick={() => {addCover()}}> Add photo as cover art!</Button>
        <Button onClick={() => {handleChange()}}> No, I want a different one</Button>
        <img style ={{padding:20}}src={url} />
        <br/>
      </div>)
      //}
     /*  else {
        console.log("made it to else block")
        return(
          <div style={{padding:50}}>
            <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
            <Button href={url}>Access photo in other window</Button>
            <Button onClick={props.ClosePhotoModal()}> I'm done</Button>
            <Button onClick={setSuccess(false)}> Upload Another</Button>
            <img src={url} />
            <br/>
          </div>)
      } */
    }
    return (
      <div className="ImageUpload">
        <center>
          <h1>UPLOAD A FILE</h1>
          {//success ? {Successmessage} : null}}
          }
          <input onChange={handleChange} ref={(ref) =>  setUploadInput(ref) } type="file"/>
          <br/>
          <button onClick={handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }

export default ImageUploader;