import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const ComparablesDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Comparables
        </div>
      </Row>
    </Main>
  );
};

export default ComparablesDashboard;