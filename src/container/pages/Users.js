import React, { useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Pagination, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { UsercardWrapper, UserCarrdTop } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { H2, H4 } from '../../components/heading/style';
import OnStart from '../../components/OnStart';
import FontAwesome from 'react-fontawesome';
import CapturePics from '../../components/capturePics/capturePics';
import Ownership from '../../components/ownership/ownership';

const User = lazy(() => import('./overview/UserCard'));
const UserCardStyle = lazy(() => import('./overview/UserCardStyle'));
const UserCardList = lazy(() => import('./overview/UserCardList'));
const UserCardGroup = lazy(() => import('./overview/UserCardGroup'));
const formData = {
  artWorkInfo: {},
  takePictures: {},
  ownership: {},
};

const completedStages = {
  artWorkInfo: false,
  takePictures: false,
  ownership: false,
};

const Users = () => {
  const { searchData, users, userGroup } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
      userGroup: state.userGroup,
    };
  });

  const { path } = useRouteMatch();

  const [state, setState] = useState({
    notData: searchData,
    current: 0,
    pageSize: 0,
    page: 0,
  });
  const [showForm, setShowForm] = useState('');

  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onChange = page => {
    setState({ ...state, page });
  };

  const loadNextSection = (prevSection = null) => {
    console.log('section', prevSection);
    formData[prevSection.name] = prevSection.data;
    completedStages[prevSection.name] = true;
    setShowForm('');
  };

  const shouldButtonDisable = () => {
    console.log('shouldButtonDisable', !(completedStages.artWorkInfo && completedStages.takePictures));
    return !(completedStages.artWorkInfo && completedStages.takePictures);
  };

  return (
    <>
      {/* Main Page */}
      {!showForm && (
        <Main style={{ background: '#0B1A23', marginLeft: '0' }}>
          <UsercardWrapper>
            <Row gutter={25} style={{ maxWidth: '300px', margin: 'auto' }}>
              <Row style={{ maxWidth: "300px", marginBottom: "30px", textAlign: 'center' }}>
                <div xs={24} className="d-flex justify-content-center" style={{ margin: 'auto' }} key="index">
                  <Col>
                    <FontAwesome name="keyboard" size="3x" style={{ padding: '10px', color: '#BAA06A' }} />
                  </Col>
                  <Col>
                    <h4 style={{ color: '#BAA06A', fontSize: '30px', margin: 0 }}>
                      Step 1:
                      {completedStages.artWorkInfo === true && <span>Complete</span>}
                    </h4>
                    <div style={{ color: '#9598A5', fontSize: '30px' }}>Enter Artwork info</div>
                    {completedStages.artWorkInfo === false &&
                      completedStages.takePictures === false &&
                      completedStages.ownership === false && (
                        <Button
                          onClick={() => setShowForm('artWorkInfo')}
                          className="start_btn"
                          type="button"
                          style={{ height: '30%', width: '65%' }}
                        >
                          START
                        </Button>
                      )}
                  </Col>
                </div>
              </Row>
              <Row style={{ maxWidth: "300px", marginBottom: "30px", textAlign: 'center' }}>
                <div xs={24} className="d-flex justify-content-center" style={{ margin: "auto" }} key="index" >
                  <Col>
                    <FontAwesome name="camera" size="3x" style={{ padding: '10px', color: '#BAA06A' }} />
                  </Col>
                  <Col>
                    <h4 style={{ color: '#BAA06A', fontSize: '30px', margin: 0 }}>
                      Step 2:
                      {completedStages.takePictures === true && <span>Complete</span>}
                    </h4>
                    <div style={{ color: '#9598A5', fontSize: '30px' }}>Take Pictures</div>
                  </Col>
                </div>
              </Row>
              <Row style={{ maxWidth: "300px", marginBottom: "30px", textAlign: 'center', height: "30%", width: "100%", marginLeft: '23%' }}>
                {completedStages.artWorkInfo === true &&
                  completedStages.takePictures === false &&
                  completedStages.ownership === false && (
                    <Button
                      onClick={() => setShowForm('takePictures')}
                      className="start_btn"
                      type="button"
                      style={{ height: '30%', width: '70%' }}
                    >
                      START
                    </Button>
                  )}
              </Row>
              <Row style={{ maxWidth: "300px", marginBottom: '30px', textAlign: 'center' }}>
                <div xs={24} className="d-flex justify-content-center" style={{ margin: 'auto' }} key="index">
                  <Col>
                    <FontAwesome name="tag" size="3x" style={{ padding: '10px', color: '#BAA06A' }} />
                  </Col>
                  <Col>
                    <h4 style={{ color: '#BAA06A', fontSize: '30px', margin: 0 }}>
                      Step 3:
                      {completedStages.ownership === true && <span>Complete</span>}
                    </h4>
                    <div style={{ color: '#9598A5', fontSize: '30px' }}>Ownership and History</div>

                  </Col>
                </div>
              </Row>
              <Row style={{ maxWidth: "300px", marginBottom: "30px", textAlign: 'center', height: "30%", width: "100%", marginLeft: '23%' }}>
                {/* {completedStages.artWorkInfo === true &&
                  completedStages.takePictures === true &&
                  completedStages.ownership === false && ( */}
                <Button
                  onClick={() => setShowForm('ownership')}
                  className="start_btn"
                  type="button"
                  style={{ height: '30%', width: '70%' }}
                >
                  START
                </Button>
                {/* )} */}
              </Row>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <Button
                  className="rvw_btn"
                  type="button"
                  disabled={shouldButtonDisable()}
                  style={{ height: '50px', width: '130px', alignSelf: 'center', margin: '10px' }}
                >
                  REVIEW
                </Button>
                <Button
                  className="sbmt_btn"
                  type="button"
                  disabled={shouldButtonDisable()}
                  style={{ height: '50px', width: '130px', margin: '10px' }}
                >
                  SUBMIT
                </Button>
              </div>
            </Row>
          </UsercardWrapper>
        </Main>
      )}
      {/* Art Work Info Page */}
      {showForm === 'artWorkInfo' && <OnStart loadNextSection={response => loadNextSection(response)} />}
      {/* Art Work Info Page */}
      {showForm === 'takePictures' && (
        <CapturePics formData={formData} loadNextSection={response => loadNextSection(response)} />
      )}
      {/* Art Work Info Page */}
      {showForm === 'ownership' && <Ownership loadNextSection={response => loadNextSection(response)} />}
    </>
  );
};

export default Users;
