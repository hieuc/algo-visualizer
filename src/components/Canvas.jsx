import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Canvas.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Canvas extends React.Component {
    render() {
        return (
            <div className="canvas">
                <div className="info">
                    <button className="btn">Extra Info right here</button>
                </div>

                <div className="message">
                    <p>
                        Welcome! Choose an algorithm to visualize from the drop downs above.
                    </p>
                </div>

                <div className="input-container">
                    <input className="num-input" type="number" placeholder="Search for" size={20}></input>
                </div>

                <br></br>

                <div className="controls">
                    <button className="btn">
                        <span>Play/Pause</span>
                        <FontAwesomeIcon icon="fa-play" className="fa"/>                
                    </button>
                    <button className="btn">
                        <span>Forward</span>
                        <FontAwesomeIcon icon="fa-forward" className="fa"/>                
                    </button>
                    <button className="btn">
                        <span>Backward</span>
                        <FontAwesomeIcon icon="fa-backward" className="fa"/>                
                    </button>
                    <button className="btn">
                        <span>Reset</span>
                        <FontAwesomeIcon icon="fa-rotate-left" className="fa"/>                
                    </button>
                </div>
            </div>
        );
    }
}

export default Canvas;