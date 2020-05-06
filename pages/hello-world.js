import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { atlassianApiCall } from '../lib/utils';

function HelloWorld(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    /**
     * Make API calls here
     */
    async function fetchData() {
      const quickFilters = await atlassianApiCall({ url: '/rest/api/3/filter/favourite' });
      setLoading(false);
    }
    fetchData();
  }, []);
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
