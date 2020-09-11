import React, { useState } from 'react';
import { Modal, Icon, Button, Header} from "semantic-ui-react";

const ImagePreview = (props) => {
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const OpenDeleteModal = () => {
        setShowDeleteModal(true);
    }
    
    const CloseDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const Delete = (img) => {
        let count = 0;
        for(let i = 0; i < props.images.length; i++) {
            if (props.images[i] == img) {
                count = i;
                break;
            }
        }
        console.log(count)
        console.log(props.images[count])
        console.log(img)
        props.removeImage(count);
        CloseDeleteModal();
        return;
    }

    if (props.images == undefined || props.images.length == 0) {
        return(
            null
        )
    }
    let imgs = []
    if (props.editMode) {
    
        imgs = props.images.map(function(curImg) {
        return(
            <div>
              <img src={curImg} 
              
              onClick={() => OpenDeleteModal()} 
              style={{
                cursor:'pointer',
                }}/>

              <Modal open={showDeleteModal}
          onClose={CloseDeleteModal}
          closeIcon
          centered
          mini
        >
          <Header> Are you sure? </Header>
          <Modal.Actions>
          <Button basic color ='red'
              onClick={() => Delete(curImg)}
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
        </div>
        );
        
    });
    }

    else {
        
        imgs = props.images.map(function(curImg) {
            return(
                
                  <img src={curImg}/>
                  
              
            );
            
        });
    }

    if (props.editMode) {
        return(
            <div>
                <label><b>Photo Preview...click on a photo to delete</b></label>
                {imgs}
            </div>
        )
    }
    return(
        <div>
            <label><b>Photo Preview</b></label>
            {imgs}
        </div>
    )
}

export default ImagePreview;