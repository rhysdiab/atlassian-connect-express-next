import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';

function HelloWorld(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { AP } = window;
    /**
     * Make API calls here
     */
    const response = AP.request({
      url: `/rest/api/3/filter/favourite`,
      type: 'GET',
    })
      .then(data => {
        setLoading(false);
        console.log(data.body);
      })
      .catch(e => {
        setLoading(false);
        console.log(e.err);
      });
  });
  return (
    <Loading loading={loading}>
      <PageContainerStyled>
        <Title>Atlassian Connect Express Next</Title>
        <TextStyled>{JSON.stringify(props)}</TextStyled>
      </PageContainerStyled>
    </Loading>
  );
}
export default HelloWorld;

const Title = styled.h1`
  font-size: 50px;
`;

const PageContainerStyled = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  justify-items: center;
  width: 100vw;
`;

const TextStyled = styled.p`
  word-wrap: break-word;
  width: 90%;
`;
