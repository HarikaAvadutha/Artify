import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const IdentificationsDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Identifications
        </div>
      </Row>
    </Main>
  );
};

export default IdentificationsDashboard;