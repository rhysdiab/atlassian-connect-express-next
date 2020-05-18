import App from 'next/app';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import MainMenu from '../components/MainMenu';
import ErrorBoundary from '../components/ErrorBoundary';
import Cancelled from '../components/Cancelled';

import 'antd/dist/antd.css';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  render() {
    let { hostBaseUrl, localBaseUrl, userAccountId, token, projectKey, lic } =
      this.props && this.props.router && this.props.router.query;

    // check if dev environment and change url
    if (!token) {
      token = process.env.TOKEN;
    }

    if (!userAccountId) {
      userAccountId = process.env.USER_ACCOUNT_ID;
    }

    const { Component, pageProps, router } = this.props;
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainMenu />
          {lic !== 'active' ? (
            <Component
              {...pageProps}
              {...router.query}
              hostBaseUrl={hostBaseUrl}
              localBaseUrl={localBaseUrl}
              userAccountId={userAccountId}
              token={token}
            />
          ) : (
              <Cancelled />
            )}
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

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 1000px;
  }

  #__next {
    height: 100%;
  }
  `;
