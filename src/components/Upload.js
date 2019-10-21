import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';


@inject('rootStore','db')
@observer
class Upload extends Component {
    constructor(props) {
        super(props);
        const { rootStore } = this.props;
        this.dataStore = rootStore.data;
    }


    handleChange = (event) => {
        
        this.dataStore.uploadingText = event.target.value;
    }
    handleUpload = (e) => {
        this.dataStore.updateMembers(this.props.db);
    }    
    render() {
        return (
            <div>
            <TextareaAutosize
            className='text-area'
            rowsMax={999}
            aria-label="maximum height"
            placeholder="copy paste epgp json here"
            onChange={this.handleChange}
            value={this.dataStore.uploadingText}
          />
            <Button variant="contained" onClick={this.handleUpload}>
              Upload
            </Button>

            </div>

           
        );
    }
}

export default Upload;
