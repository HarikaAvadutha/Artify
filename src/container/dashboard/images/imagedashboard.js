import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const ImageDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Images
        </div>
      </Row>
    </Main>
  );
};

export default ImageDashboard;