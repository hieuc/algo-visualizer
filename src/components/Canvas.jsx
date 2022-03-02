import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Canvas.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.boardRef = React.createRef();
        this.state = {
            width: props.width,
            height: props.height,
            array: [],
            hideWelcomeMessage: true,
            curIndex: -1
        }

        var rands = [];
        while (rands.length < 10) {
            var n = Math.floor(Math.random() * 100);
            
            if (rands.indexOf(n) === -1)
                rands.push(n);
        }

        for (var i = 0; i < 10; i++) {
            this.state.array.push({id:i, value:rands[i]})
        }
    }

    clearWelcomeMessage = () => {
        this.setState({ hideWelcomeMessage : !this.state.hideWelcomeMessage});
    }

    stepForward = () => {
        this.setState({ curIndex : Math.min(this.state.curIndex+1, this.state.array.length-1) });
    }

    stepBackward = () => {
        this.setState({ curIndex: Math.max(this.state.curIndex-1, 0) });
    }

    drawBlocks = () => {
        return this.state.array.map(
            v => <td className={"value-block" + (v.id === this.state.curIndex ? " highlight" : "")} 
                key={v.id} id={v.id}>{v.value}</td>)
    }

    render = (props) => {
        return (
            <div className="content">
                <div className="info">
                    <button className="btn" onClick={this.clearWelcomeMessage}>Extra Info right here</button>
                </div>

                <div className={this.state.hideWelcomeMessage ? 'hidden' : 'message'}>
                    <p>
                        Welcome! Choose an algorithm to visualize from the drop downs above.
                    </p>
                </div>
                
                {/*
                <svg ref={this.boardRef} className="board" width={this.state.width} height={this.state.height}>
                    USE SVG FOR MORE ADVANCED ANIMATIONS IN THE FUTURE
                </svg>
                */}
                <div className={this.state.hideWelcomeMessage ? 'table-container' : 'hidden'}>
                    <table className="elements">
                            <tbody>
                                <tr className="value-row">
                                    <td></td>
                                    {this.drawBlocks()}
                                </tr>
                                <tr className="index-row">
                                    <td >Index</td>
                                    {[...Array(10).keys()].map(v => <td key={v*Math.random()}>{v}</td>)}
                                </tr>
                            </tbody>
                    </table>
                </div>

                <div className={this.state.hideWelcomeMessage ? 'input-container' : 'hidden'}>
                    <input className="num-input" type="number" placeholder="Search for" size={20}></input>
                </div>

                <br></br>

                <div className={this.state.hideWelcomeMessage ? 'controls' : 'hidden'}>
                    <button className="btn">
                        <span>Play/Pause</span>
                        <FontAwesomeIcon icon="fa-play" className="fa"/>                
                    </button>
                    <button className="btn" onClick={this.stepForward}>
                        <span>Forward</span>
                        <FontAwesomeIcon icon="fa-forward-step" className="fa"/>                
                    </button>
                    <button className="btn" onClick={this.stepBackward}>
                        <span>Backward</span>
                        <FontAwesomeIcon icon="fa-backward-step" className="fa"/>                
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