import React from 'react';
import './App.css';
import NavBar from "./components/NavBar"
import Canvas from "./components/Canvas"

// for icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faForward, faBackward, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faForward, faBackward, faRotateLeft)

class App extends React.Component {
  handleHide() {
    
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Canvas />
      </React.Fragment>
    );
  }
}

export default App;
