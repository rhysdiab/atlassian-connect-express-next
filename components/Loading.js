import styled from 'styled-components';
import { Spin } from 'antd';

function Loading({ loading, children }) {
  return (
    <>
      {loading ? (
        <SpinWrapperStyled>
          {' '}
          <Spin />
        </SpinWrapperStyled>
      ) : (
          children
        )}
    </>
  );
}
export default Loading;

const SpinWrapperStyled = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
