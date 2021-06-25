import React, { useState } from 'react';
import axios, { post } from 'axios';
import WebcamCapture from '../camera/camera';
import { generateUUID } from '../../utility/utility';
import { Button } from '../buttons/buttons';

const collectionID = `coll-${generateUUID()}`;
const SERVER_ENDPOINT = 'http://localhost:5000/api/art/';

const CapturePics = ({ loadNextSection, formData }) => {
  const [currentStage, setCurrentStage] = useState('info');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const imageInputRef = React.useRef();

  const artId = `art-${generateUUID()}`;

  const stages = {
    info: {
      title: 'Take a Series of pictures',
      caption: '',
    },
    mainImage1: {
      title: 'Main Image',
      caption: 'Capture the entire work including the frame from directly in front',
    },
    mainImage2: {
      title: 'Main Image (2)',
      caption: 'Take 2 steps to the right. This may reduce glare. Capture the entire work including the frame.',
      isLast: false,
    },
    mainImage3: {
      title: 'Main Image (3)',
      caption: 'Take 4 steps to the left. This may reduce glare. Capture the entire work including the frame.',
      isLast: false,
    },
    upperLeftQuadrant: {
      title: 'Upper Left Quadrant',
      caption: 'Align area in green rectangle.',
      isLast: false,
    },
    upperRightQuadrant: {
      title: 'Upper Right Quadrant',
      caption: 'Align area in green rectangle.',
      isLast: false,
    },
    lowerLeftQuadrant: {
      title: 'Lower Left Quadrant',
      caption: 'Align area in green rectangle.',
      isLast: false,
    },
    lowerRightQuadrant: {
      title: 'Lower Right Quadrant',
      caption: 'Align area in green rectangle.',
      isLast: false,
    },
    signatureCloseUp: {
      title: 'Close-up of the signature',
      caption: 'If the work is NOT signed press Not signed.',
      isLast: false,
    },
    darkestArea: {
      title: 'Darkest Area',
      caption: 'Stay in focus.',
      isLast: false,
    },
    lightestArea: {
      title: 'Lightest Area',
      caption: 'Stay in focus.',
      isLast: false,
    },
    media: {
      title: 'Media',
      caption:
        'The way paint is applied to the surface tells us a lot about the artist and materials. Please take a close-up of the objects surface',
      isLast: false,
    },
    surface: {
      title: 'Surface',
      caption: 'Take a close-up of the surface where the texture is coming through.',
      isLast: false,
    },
    condition: {
      title: 'Condition',
      caption:
        'Condition usually helps us get a sense of the objects age. Please capture any potential abrasions cracking, etc.',
      isLast: false,
    },
    additionalImages: {
      title: 'Additional Images',
      caption: 'Please take any additional photographs of the objects surface.',
      isLast: false,
    },
    backFullPicture: {
      title: 'Full picture of paintings back',
      caption: 'Capture the entire work including the frame.',
      isLast: false,
    },
    galleryStickers: {
      title: 'Gallery Stickers',
      caption: 'Press No Stickers if there arent any.',
      isLast: true,
    },
  };

  const navObj = (obj, currentKey, direction) => {
    return {
      key: Object.keys(obj)[Object.keys(obj).indexOf(currentKey) + direction],
      value: Object.values(obj)[Object.keys(obj).indexOf(currentKey) + direction],
    };
  };

  const converBase64toFileObj = base64String => {
    // const base64data = base64String.replace('data:image/jpeg;base64,', '');
    // const bs = atob(base64data);
    // const buffer = new ArrayBuffer(bs.length);
    // const ba = new Uint8Array(buffer);
    // for (let i = 0; i < bs.length; i++) {
    //   ba[i] = bs.charCodeAt(i);
    // }
    // return new Blob([ba], { type: 'image/jpeg' });
    var arr = base64String.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], `upload-${+new Date()}`, { type: mime });
  };

  const fileUpload = (imgSrc, type = 'live') => {
    console.log('type', type);
    const selectedFile = type === 'upload' ? imgSrc : converBase64toFileObj(imgSrc);
    console.log('selecredFile', selectedFile.files[0].size)
    const payload = new FormData();
    payload.append('ArtId', artId);
    payload.append('CollectionId', collectionID);
    payload.append('OriginalImage', selectedFile);
    payload.append('ArtName', 'Test ArtName');
    payload.append('Filelen', Math.round(type === 'upload' ? selectedFile.files[0].size / 1000 : selectedFile.size / 1000));
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


  const handleNext = ({ imgSrc, type }) => {
    let nextObj;
    console.log('currentStage', currentStage);
    console.log('stages', stages);
    // if (!stages[currentStage].hasOwnProperty('isLast')) {
    //   const nextStage = navObj(stages, currentStage, 1);
    //   setCurrentStage(nextStage.key);
    // } else {
    //   if(currentStage === stages[Object.keys(stages).length - 1]) {
    //
    //   }
    // }
    if (currentStage !== 'info') {
      console.log('formData', formData);
      fileUpload(imgSrc, type).then(res => {
        console.log('res', res);
        setSelectedFile(null);
        setSelectedType(null);
        if (imageInputRef.current) imageInputRef.current.value = '';
        nextObj = navObj(stages, currentStage, 1);
        setCurrentStage(nextObj.key);
      });
    }
    // else if (currentStage === 'mainImage2') {
    //   loadNextSection();
    // }
    else {
      nextObj = navObj(stages, currentStage, 1);
      setCurrentStage(nextObj.key);
    }
  };

  const handleBack = () => {
    const backObj = navObj(stages, currentStage, -1);
    setCurrentStage(backObj.key);
  };

  const handleSelectedType = (selctedType) => {
    setSelectedType(selctedType);
    setSelectedFile(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const captureContainer = {
    maxWidth: '300px',
    margin: 'auto',
    fontSize: '15px',
  }

  const title = {
    padding: '10px',
    fontWeight: 900,
    fontSize: '20px',
    color: 'white',
  }

  const gold = {
    color: '#BAA06A',
  }

  const groupList = {
    listStyleType: 'disc',
    margin: '15px',
  }

  const ptTen = {
    paddingTop: '10px',
  }

  const autoNextButton = {
    backgroundColor: '#BAA06A',
    borderRadius: 24.5,
    color: '#0B1A23',
    margin: '5px'
  }

  const manualBackButton = {
    backgroundColor: '#555862',
    borderRadius: 24.5,
    color: '#FFFFFF',
    margin: '5px'
  }

  const nextButton = {
    backgroundColor: '#BAA06A',
    borderRadius: 24.5,
    color: '#0B1A23',
    float: 'right',
    padding: '5px',
    width: '75px'
  }

  return (
    <div style={captureContainer}>
      {currentStage === 'info' && Object.keys(stages[currentStage]).length && (
        <div>
          <div style={title}>{stages[currentStage].title}</div>
          <div>
            <p style={gold}> Our advanced computer vision:</p>
            <ul style={groupList}>
              <li>Stabilizes the camera</li>
              <li>Corrects for camera positioning errors</li>
              <li>Prevents out of focus images</li>
              <li>Adapts to your room lighting</li>
              <li>Creates full-frame image</li>
              <li>Enhances resolution of fine detail and color.</li>
            </ul>
            <span className={ptTen}>Please be sure to avoid glare and harsh shadows.</span>
          </div>
          <button style={nextButton} onClick={handleNext}>
            Next
          </button>
        </div>
      )}
      {
        currentStage !== 'info' && Object.keys(stages[currentStage]).length && (
          <div>
            <div>
              <div style={{ fontSize: '15px' }}>{stages[currentStage].title}</div>
              <div>{stages[currentStage].caption}</div>
              <Button style={manualBackButton} onClick={() => handleSelectedType('upload')}>Manual</Button>
              <Button style={autoNextButton} onClick={() => handleSelectedType('live')}>Auto</Button>
            </div>
            {selectedType === 'live' && (
              <div>
                <WebcamCapture collectionID={collectionID} handleBack={handleBack} handleNext={handleNext} />
              </div>
            )}
            {selectedType === 'upload' && (
              <div style={{ margin: '25px 0' }}>
                <input type="file" ref={imageInputRef} onChange={($event) => handleFileInput($event.target.files[0],)} />
                <Button style={manualBackButton} className="next-button" onClick={handleBack}>
                  Back
                </Button>
                <Button style={autoNextButton} className="next-button" onClick={() => handleNext({ imgSrc: '', type: 'upload' })}>
                  Next
                </Button>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
};

export default CapturePics;
