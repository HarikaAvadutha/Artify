import React from 'react';
import { Row } from 'antd';

import { Main } from '../../styled';

const CatalogueValuationDashboard = () => {
  return (
    <Main>
      <Row justify="center" gutter={25}>
        <div className="mainContainer">
          Catalogue / Valuation
        </div>
      </Row>
    </Main>
  );
};

export default CatalogueValuationDashboard;