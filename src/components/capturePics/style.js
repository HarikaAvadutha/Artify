import Styled from 'styled-components';

const Style = Styled.div`
  .capture-container {
    max-width: '300px';
    margin: 'auto';
    padding: '15px';
    font-size: '15px';

    .title {
      padding: 10px;
      font-weight: 900;
      font-size: 20px;
      color: white;
    }

    .gold {
      color: '#BAA06A';
    }

    .group-list {
      list-style-type: disc;
      margin: 15px;
    }

    .pt-ten {
      padding-top: '10px';
    }
  }
`;

export { Style };
