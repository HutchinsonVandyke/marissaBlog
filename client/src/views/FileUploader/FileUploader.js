import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';
import API from "../../api/baseAPI";
import Image from 'semantic-ui-react'
import { PromiseProvider } from 'mongoose';
import './FileUploader.css';



const FileUploader = (props) => {
  
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadInput, setUploadInput] = useState(null) 
  const [fileName_, setFileName_] = useState(null)

  const deletePhoto = () => {
    props.deleteImage();
    setSuccess(false);
    setUrl("");
  }

  const addFile = () => {
    props.setText(url);
    props.CloseFileModal()
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
    setFileName_(file.name)
    let fileType = fileParts[1];
    
    //console.log("Preparing the upload");
     API.post("/sign_s3",{
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
      //console.log('here')
      //console.log('props.imgadded is ' + props.imageAdded)
      //if(!props.imageAdded) {

      return(
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>Uploaded {fileName_}</h3>
        <Button onClick={() => {addFile()}}> Add file to work!</Button>
        <Button onClick={() => {handleChange()}}> No, I want a different one</Button>
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

export default FileUploader;