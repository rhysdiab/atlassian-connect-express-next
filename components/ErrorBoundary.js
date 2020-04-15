import React, { Component } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';


Sentry.init({ dsn: process.env.SENTRY_URL });

export default class ErrorBoundary extends React.Component {

 constructor(props) {
  super(props);
  this.state = { error: null };
 }

 componentDidCatch(error, errorInfo) {
  this.setState({ error });
  Sentry.configureScope((scope) => {
   Object.keys(errorInfo).forEach(key => {
    scope.setExtra(key, errorInfo[key]);
   });
  });
  Sentry.captureException(error);
 }

 render() {
  if (this.state.error) {
   // render fallback UI
   return (
    <ErrorWrapperStyled>
     <MessageWrapperStyled>
      <h1>Sorry, An Error Was Encountered</h1>
      <h1> But I'm Sure I can Fix It. No Need To Cancel Your Subscription  </h1>
      <h1>&#128563; &#128563; &#128563; &#128563;</h1>
      <h1>Contact Support Below &#128071; &#128071;</h1>
      <ButtonStyled href="mailto:rhys@agiledocs.io" target="_blank" rel="noopener noreferrer">Contact Support</ButtonStyled>
     </MessageWrapperStyled>
    </ErrorWrapperStyled>

   );
  } else {
   // when there's not an error, render children untouched
   return this.props.children;
  }
 }
}

const ErrorWrapperStyled = styled.div`
 width: 100vw;
 display: flex;
 justify-content: center;
 margin-top: 20px;
`;

const MessageWrapperStyled = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ButtonStyled = styled(Button)`
 display: block;
 margin: auto;
 margin-top: 20px;
 width: 100%;
`
