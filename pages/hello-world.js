import styled from 'styled-components';

export default props => {
  return (
    <div>
      <Title>Atlassian Connect Next</Title>
      <div>{JSON.stringify(props)}</div>
    </div>
  );
};

const Title = styled.h1`
  font-size: 50px;
  color: blue;
`;
