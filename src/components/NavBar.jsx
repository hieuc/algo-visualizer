import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Navbar, NavDropdown} from 'react-bootstrap'
import './NavBar.css'
import logo from './logo.png';

// cheat to have the dropdown separated from nav-item while 
// the hovers work normally
const invisBlock = {
    opacity: 0,
    position: 'absolute',
    top: "-1em",
    left: "-1px",
    width: "100%"
}

class NavBar extends React.Component {

    // constructor() {
    //     super();
    //     this.navMenuMouseLeave = this.navMenuMouseLeave.bind(this);
    // }

    /**
     * Close the dropdown when mouse leaves
     */
    navMenuMouseLeave = (e) => {
        e.target.parentNode.parentNode.parentNode.click();
        // unfocus nav-item
        e.target.parentNode.parentNode.parentNode.firstChild.blur();

        // currently attaching with the wraparound div of the dropdown.
        // could instead attach to element of dropdown-menu class through componentDidMount()
    }

    render () {
        return (
            <React.Fragment>
                <Navbar className="bg-purple">
                    <Navbar.Brand>
                        <a href="/" title='AlgoViz'>
                            <img src={logo} className="logo" alt="logo"/>
                        </a>
                    </Navbar.Brand>
                    
                    <NavDropdown title="Search">
                        <div onMouseLeave={(e) => this.navMenuMouseLeave(e)}>
                            <div style={invisBlock}>m</div>
                            <NavDropdown.Item href="#">Linear Search</NavDropdown.Item> 
                            <NavDropdown.Item href="#">Binary Search</NavDropdown.Item> 
                            <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                            <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                        </div>
                    </NavDropdown>

                    <NavDropdown title="Sort">
                        <div onMouseLeave={(e) => this.navMenuMouseLeave(e)}>
                            <div style={invisBlock}>m</div>
                            <NavDropdown.Item href="#">1st</NavDropdown.Item> 
                            <NavDropdown.Item href="#">2nd</NavDropdown.Item> 
                            <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                            <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                        </div>
                    </NavDropdown>

                    <NavDropdown title="Pathfinding">
                        <div onMouseLeave={(e) => this.navMenuMouseLeave(e)}>
                            <div style={invisBlock}>m</div>
                            <NavDropdown.Item href="#">1st</NavDropdown.Item> 
                            <NavDropdown.Item href="#">2nd</NavDropdown.Item> 
                            <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                            <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                        </div>
                    </NavDropdown>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default NavBar;