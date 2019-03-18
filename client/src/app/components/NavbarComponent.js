import React from 'react';
import { Collapse, Navbar, Nav, NavItem, Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Colors from '../constants/Colors';

export default class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar color="dark"  expand="md">
          <NavLink to={this.props.isLoggedIn ? '/configure' : '/login'} tag={Link} style={styles.title}>Planner</NavLink>
          <Collapse isOpen={true} navbar>
          {
            this.props.isLoggedIn ?
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to="/main" tag={Link} style={styles.pageTitle}>Main</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/configure" tag={Link} style={styles.pageTitle}>Configure</NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={()=> this.props.logoutAction()}>Log out</Button>
                </NavItem>
              </Nav> :
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to="/login" tag={Link} style={styles.pageTitle}>Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register" tag={Link} style={styles.pageTitle}>Register</NavLink>
                </NavItem>
              </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const styles = {
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 25
  },
  pageTitle: {
    color: Colors.white
  }
}
