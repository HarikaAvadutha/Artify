import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const GalleryDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Gallery
        </div>
      </Row>
    </Main>
  );
};

export default GalleryDashboard;