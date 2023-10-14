import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';

const GlobalStyle = createGlobalStyle`
  body {
    background: #494F55;
    color: white;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;
