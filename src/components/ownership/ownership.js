import React, { useState } from 'react';
import axios, { post } from 'axios';
import WebcamCapture from '../camera/camera';
import { generateUUID } from '../../utility/utility';
import { Button } from '../buttons/buttons';

const collectionID = `coll-${generateUUID()}`;
const SERVER_ENDPOINT = 'http://localhost:5000/api/art/';

let currentScreenCnt = 1;
const Ownership = ({ loadNextSection, formData }) => {
  const [currentStage, setCurrentStage] = useState('purchase');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const imageInputRef = React.useRef();

  const stages = {
    purchase: {
      title: 'Yuor Purchase Price',
    },
    provenance: {
      title: 'Provenance & Documents',
    },
    paintingLocation: {
      title: 'Where is the painting located now?',
      caption: 'Optional',
    },
  };

  const navObj = (obj, currentKey, direction) => {
    return {
      key: Object.keys(obj)[Object.keys(obj).indexOf(currentKey) + direction],
      value: Object.values(obj)[Object.keys(obj).indexOf(currentKey) + direction],
    };
  };

  const converBase64toFileObj = base64String => {
    const base64data = base64String.replace('data:image/jpeg;base64,', '');
    const bs = atob(base64data);
    const buffer = new ArrayBuffer(bs.length);
    const ba = new Uint8Array(buffer);
    for (let i = 0; i < bs.length; i++) {
      ba[i] = bs.charCodeAt(i);
    }
    return new Blob([ba], { type: 'image/jpeg' });
  };

  const fileUpload = (imgSrc, type = 'live') => {
    console.log('type', type);
    const payload = new FormData();
    payload.append('ArtId', artId);
    payload.append('CollectionId', collectionID);
    payload.append('OriginalImage', type === 'upload' ? selectedFile : converBase64toFileObj(imgSrc));
    payload.append('ArtName', 'Test ArtName');
    payload.append('Filelen', '64');
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    return post(SERVER_ENDPOINT, payload, config);
  };



  const handleFileInput = (file) => {
    // handle validations
    console.log('selectedFle', file)
    setSelectedFile(file);
    // fileUpload(file, 'upload');
    // onFileSelect(e.target.files[0])
  }
  const handleManualInput = ($event) => {
    // handle validations
    console.log('Manual Input', $event.target.value);
    // setSelectedFile(file);
    // fileUpload(file, 'upload');
    // onFileSelect(e.target.files[0])
  }


  const handleNext = ({ imgSrc, type }) => {
    let nextObj;
    currentScreenCnt += 1;
    if (currentScreenCnt === (stages.length + 1)) {
      loadNextSection({
        name: 'artWorkInfo',
        formData
      });
    }
    nextObj = navObj(stages, currentStage, 1);
    setCurrentStage(nextObj.key);
  };

  const handleBack = () => {
    const backObj = navObj(stages, currentStage, -1);
    setCurrentStage(backObj.key);
  };

  const onPurchaseAmountChange = ($event) => {
    console.log('Entered Amount', $event)
  }
  const onLocationChange = ($event) => {
    console.log('Entered Amount', $event)
  }

  const handleSelectedType = (selctedType) => {
    setSelectedType(selctedType);
    setSelectedFile(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const ownerShipContainer = {
    maxWidth: '300px',
    margin: 'auto',
    fontSize: '15px',
    marginBottom: '100px'
  }

  const inputType = {
    width: '100%',
    borderRadius: '20px',
    backgroundColor: '#BAA06A',
    padding: '5px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'black',
    textAlign: 'right',
  }

  const fieldContainer = {
    textAlign: 'left',
    minHeight: '200px',
    margin: '10px',
  }

  const header = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 700,
    paddingLeft: '5px',
  }

  const nextButton = {
    float: 'right',
    padding: '5px',
    borderRadius: '20px',
    backgroundColor: '#BAA06A',
    width: '90px',
    fontSize: '18px',
    fontWeight: 600,
    color: 'black',
    margin: '10px 0'
  }

  const skipButton = {
    float: 'right',
    padding: '5px',
    borderRadius: '20px',
    backgroundColor: '#555862',
    width: '90px',
    fontSize: '18px',
    color: '#0B1A23',
    margin: '10px 0',
  }

  const inputNextButton = {
    backgroundColor: '#BAA06A',
    borderRadius: 24.5,
    color: '#0B1A23',
    margin: '5px'
  }

  const inputBackButton = {
    backgroundColor: '#555862',
    borderRadius: 24.5,
    color: '#FFFFFF',
    margin: '5px'
  }

  const imageDiv = {
    width: '126px',
    height: '168px',
    border: '2px solid white',
    margin: 'auto'
  }

  const inputField = {
    width: '100%',
    borderRadius: '20px',
    backgroundColor: '#BAA06A',
    padding: '5px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'black',
    margin: '10px 0',
    textAlign: 'center'
  }

  const inputCity = {
    width: '100%',
    borderRadius: '20px',
    border: '1px solid #BAA06A',
    backgroundColor: '#0B1A23',
    color: '#BAA06A',
    padding: '5px',
    margin: '3px 0',
  }

  const inputState = {
    width: '100%',
    borderRadius: '20px',
    backgroundColor: '#BAA06A ',
    color: 'black',
    padding: '5px',
    margin: '3px 0',
  }

  return (
    <div style={ownerShipContainer}>
      {currentStage === 'purchase' && Object.keys(stages[currentStage]).length && (
        <div>
          <div style={imageDiv}></div>
          <div style={fieldContainer}>
            <div style={header}>{stages[currentStage].title}:</div>
            <div>
              <input style={inputType} type="number" onChange={($event) => onPurchaseAmountChange($event)} />
            </div>
            <span style={{ float: 'right', padding: '10px' }}>US Dollars</span>
          </div>
          <button style={nextButton} className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
      {currentStage === 'provenance' && Object.keys(stages[currentStage]).length && (
        <>
          <div style={imageDiv}></div>
          <div style={fieldContainer}>
            <div>
              <div style={header}>{stages[currentStage].title}</div>
              <div>{stages[currentStage].caption}</div>
              <div>
                <Button style={inputField} onClick={() => handleSelectedType('upload')}>Browse for File(s)...</Button>
              </div>
              <div>
                <Button style={inputField} onClick={() => handleSelectedType('live')}>Use Camera to Scan Documents</Button>
              </div>
              <div>
                <Button style={inputField} onClick={() => handleSelectedType('manual')}>Enter Information Manullay</Button>
              </div>
            </div>
            {selectedType === 'live' && (
              <div>
                <WebcamCapture collectionID={collectionID} handleBack={handleBack} handleNext={handleNext} />
              </div>
            )}
            {selectedType === 'upload' && (
              <div style={{ margin: '25px 0' }}>
                <input type="file" ref={imageInputRef} onChange={($event) => handleFileInput($event.target.files[0],)} />
                <Button style={inputBackButton} onClick={handleBack}>
                  Back
                </Button>
                <Button style={inputNextButton} onClick={() => handleNext({ imgSrc: '', type: 'upload' })}>
                  Next
                </Button>
              </div>
            )}
            {selectedType === 'manual' && (
              <div style={{ margin: '25px 0' }}>
                <input onChange={($event) => handleManualInput($event)} />
                <Button style={inputBackButton} className="next-button" onClick={handleBack}>
                  Back
                </Button>
                <Button style={inputNextButton} className="next-button" onClick={() => handleNext({ imgSrc: '', type: 'manual' })}>
                  Next
                </Button>
              </div>
            )}
          </div>
          {!selectedType && (
            <button style={skipButton} onClick={handleNext}>
              Skip
            </button>)}
        </>
      )}
      {currentStage === 'paintingLocation' && Object.keys(stages[currentStage]).length && (
        <div style={fieldContainer}>
          <div style={header}>{stages[currentStage].title}</div>
          <p>Optional</p>
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '22px', fontWeight: 700 }}>City:</label><br />
            <input style={inputCity} type="text" onChange={($event) => onLocationChange($event, 'city')} />
            <label style={{ fontSize: '22px', fontWeight: 700 }}>State:</label><br />
            <input style={inputState} type="text" onChange={($event) => onLocationChange($event, 'state')} />
          </div>
          <button style={skipButton} onClick={handleNext}>
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default Ownership;
