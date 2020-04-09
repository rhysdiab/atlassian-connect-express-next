import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import MainMenu from '../components/MainMenu';

import 'antd/dist/antd.css';

const theme = {
 colors: {
  primary: '#0070f3',
 },
};

export default class MyApp extends App {
 render() {
  const { Component, pageProps } = this.props;
  return (
   <ThemeProvider theme={theme}>
    <MainMenu />
    <Component {...pageProps} />
   </ThemeProvider>
  );
 }
}
