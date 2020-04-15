import styled from 'styled-components';

export default props => {
  return (
    <PageContainerStyled>
      <Title>Atlassian Connect Next</Title>
      <div>{JSON.stringify(props)}</div>
    </PageContainerStyled>
  );
};

const Title = styled.h1`
  font-size: 50px;
`;

const PageContainerStyled = styled.div`
padding: 10px;
`;
