import React from 'react';
import { Row, Col } from 'antd';
import { Content } from './overview/style';

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Row>
        <Col xxl={8} xl={9} lg={8} md={8} xs={24}>
          <div >
            <Content>
              <img style={{ width: '300px' }} src={require('../../../static/img/logo.png')} alt="logo" />
            </Content>
          </div>
        </Col>
        <Col xxl={16} xl={15} lg={16} md={16} xs={24}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
