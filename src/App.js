import React from 'react';
import './App.css';
import NavBar from "./components/NavBar"
import Canvas from "./components/Canvas"

// for icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faForwardStep, faBackwardStep, faRotateLeft, faPause, faWrench } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faForwardStep, faBackwardStep, faRotateLeft, faPause, faWrench)

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Canvas width={1000} height={500}/>
      </React.Fragment>
    );
  }
}

export default App;
