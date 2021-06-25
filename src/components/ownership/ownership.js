import React, { useState } from 'react';
import axios, { post } from 'axios';
import WebcamCapture from '../camera/camera';
import { generateUUID } from '../../utility/utility';
import { Button } from '../buttons/buttons';

const collectionID = `coll-${generateUUID()}`;
const SERVER_ENDPOINT = 'http://localhost:5000/api/art/';

const Ownership = ({ loadNextSection, formData }) => {
  const [currentStage, setCurrentStage] = useState('purchase');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const imageInputRef = React.useRef();

  const stages = {
    purchase: {
      title: 'Purchase Price',
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

  return (
    <>
      {currentStage === 'purchase' && Object.keys(stages[currentStage]).length && (
        <div>
          <div>{stages[currentStage].title}</div>
          <div>
            <input type="number" onChange={($event) => onPurchaseAmountChange($event)} />
          </div>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
      {currentStage === 'provenance' && Object.keys(stages[currentStage]).length && (
        <>
          <div>
            <div>{stages[currentStage].title}</div>
            <div>{stages[currentStage].caption}</div>
            <div>
              <Button onClick={() => handleSelectedType('upload')}>Browse for File(s)...</Button>
            </div>
            <div>
              <Button onClick={() => handleSelectedType('live')}>Use Camera to Scan Documents</Button>
            </div>
            <div>
              <Button onClick={() => handleSelectedType('manual')}>Enter Information Manullay</Button>
            </div>
          </div>
          {selectedType === 'live' && (
            <div>
              <WebcamCapture collectionID={collectionID} handleBack={handleBack} handleNext={handleNext} />
            </div>
          )}
          {selectedType === 'upload' && (
            <div>
              <input type="file" ref={imageInputRef} onChange={($event) => handleFileInput($event.target.files[0],)} />
              <Button className="next-button" onClick={handleBack}>
                Back
              </Button>
              <Button className="next-button" onClick={() => handleNext({ imgSrc: '', type: 'upload' })}>
                Next
              </Button>
            </div>
          )}
          {selectedType === 'manual' && (
            <div>
              <input onChange={($event) => handleManualInput($event)} />
              <Button className="next-button" onClick={handleBack}>
                Back
              </Button>
              <Button className="next-button" onClick={() => handleNext({ imgSrc: '', type: 'manual' })}>
                Next
              </Button>
            </div>
          )}
          {!selectedType && (
            <button className="next-button" onClick={handleNext}>
              Next
            </button>)}
        </>
      )}
      {currentStage === 'paintingLocation' && Object.keys(stages[currentStage]).length && (
        <div>
          <div>{stages[currentStage].title}</div>
          <div>
            <label>City:</label>
            <input type="text" onChange={($event) => onLocationChange($event, 'city')} />
            <label>State:</label>
            <input type="text" onChange={($event) => onLocationChange($event, 'state')} />
          </div>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Ownership;
