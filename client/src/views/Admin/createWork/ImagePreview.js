import React, { useState } from 'react';

const ImagePreview = (props) => {
    if (props.images == undefined || props.images.length == 0) {
        return(
            null
        )
    }
    
        const imgs = props.images.map(function(curImg) {
        return(
            
              <img src={curImg} />
            
        );
        
    });
    return(
        <div>
            <label><b>Photo Preview</b></label>
            {imgs}
        </div>
    )
}

export default ImagePreview;