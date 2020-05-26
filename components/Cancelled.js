import styled from 'styled-components';

function Cancelled({ title, hostBaseUrl }) {
 return (
  <div>
   <HeaderTextStyled>You need a valid license to use {title} </HeaderTextStyled>
   <SubHeaderTextStyled>
    Restart your subscription{' '}
    <a
     href={`${hostBaseUrl}/plugins/servlet/upm?source=side_nav_manage_addons`}
     target="_blank"
     rel="noopener noreferrer"
    >
     here
        </a>
   </SubHeaderTextStyled>
  </div>
 );
}
export default Cancelled;

const HeaderTextStyled = styled.h1`
  text-align: center;
`;

const SubHeaderTextStyled = styled.h3`
  text-align: center;
`;
