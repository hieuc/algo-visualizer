import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Navbar, NavDropdown} from 'react-bootstrap'
import './NavBar.css'
import logo from './logo.png';

class NavBar extends React.Component {
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
                        <NavDropdown.Item href="#">Linear Search</NavDropdown.Item> 
                        <NavDropdown.Item href="#">Binary Search</NavDropdown.Item> 
                        <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                        <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                    </NavDropdown>

                    <NavDropdown title="Sort">
                        <NavDropdown.Item href="#">1st</NavDropdown.Item> 
                        <NavDropdown.Item href="#">2nd</NavDropdown.Item> 
                        <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                        <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                    </NavDropdown>

                    <NavDropdown title="Pathfinding">
                        <NavDropdown.Item href="#">1st</NavDropdown.Item> 
                        <NavDropdown.Item href="#">2nd</NavDropdown.Item> 
                        <NavDropdown.Item href="#">3rd</NavDropdown.Item> 
                        <NavDropdown.Item href="#">4th</NavDropdown.Item> 
                    </NavDropdown>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default NavBar;