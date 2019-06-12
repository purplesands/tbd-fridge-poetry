import React, { Fragment } from 'react';
import MainInput from './MainInput'
import LineContainer from './LineContainer'
import Sorting from './Sorting'

import './App.css';

function App() {
  return (
    <Fragment>
      <Sorting/>
      <MainInput />
    </Fragment>
  );
}

export default App;
