import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const OverviewDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Overview
        </div>
      </Row>
    </Main>
  );
};

export default OverviewDashboard;