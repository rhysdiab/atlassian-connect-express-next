import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import MainMenu from '../components/MainMenu';
import ErrorBoundary from '../components/ErrorBoundary';

import 'antd/dist/antd.css';

const theme = {
 colors: {
  primary: '#0070f3',
 },
};

export default class MyApp extends App {
 render() {

  let { hostBaseUrl, localBaseUrl, userAccountId, token, projectKey } = this.props;

  // check if dev environment and change url
  if (!token) {
   token = process.env.TOKEN;
  }

  if (!hostBaseUrl) {
   hostBaseUrl = process.env.HOST_BASE_URL;
  }

  if (!localBaseUrl) {
   localBaseUrl = process.env.LOCAL_BASE_URL;
  }

  if (!userAccountId) {
   userAccountId = process.env.USER_ACCOUNT_ID;
  }

  const { Component, pageProps, router } = this.props;
  return (
   <ErrorBoundary>
    <ThemeProvider theme={theme}>
     <MainMenu />
     <Component {...pageProps} {...router.query} hostBaseUrl={hostBaseUrl} localBaseUrl={localBaseUrl} userAccountId={userAccountId} token={token} />
    </ThemeProvider>
   </ErrorBoundary>
  );
 }
}

MyApp.getInitialProps = async appContext => {
 // calls page's `getInitialProps` and fills `appProps.pageProps`
 const appProps = await App.getInitialProps(appContext);

 return { ...appProps };
};
