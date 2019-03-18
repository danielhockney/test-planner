import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { POST } from '../core/CRUD';
import NavbarComponent from '../components/NavbarComponent';

const validator = require('../core/validator');

export default class RegisterPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData: {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      },
      error: '',
      isLoggedIn: false
    };
  }

  registerUser = async data => {
    let isValid = validator(data);
    if(isValid.success){
      try {
        let response = await POST('register', data);
        if(response.success){
          localStorage.setItem('userId', response.data.id);
          this.setState({isLoggedIn: true});
        } else {
          this.setState({error: response.error});
        }
      } catch (error) {
        this.setState({
          error: error.message
        });
      }
    } else {
      this.setState({
        error: isValid.message
      });
    }
  }

  handleKeyPress = async e => {
    if(e.key === 'Enter') {
      await this.registerUser(this.state.userData);
    }
  }

  render(){
    return(
      <div>
        {this.state.isLoggedIn ? <Redirect to="/configure"/> : null}
        <NavbarComponent isLoggedIn={this.state.isLoggedIn}/>
        {
          this.state.error ?
          <Alert color="danger" className="col-lg-4" style={styles.alertStyle}>{this.state.error}</Alert>
          : null
        }
        <div className='row justify-content-center'  style={styles.container}>
          <Form className='col-6 col-lg-2'>
              <div>
                <FormGroup>
                 <Label for="username">Username</Label>
                 <Input value={this.state.userData.username}
                        onChange={(username)=> this.setState(Object.assign(this.state.userData, {username: username.target.value}))}
                        onFocus={() => this.setState({error: ''})}
                        onKeyPress={this.handleKeyPress}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                 />
               </FormGroup>
                <FormGroup>
                 <Label for="email">Email</Label>
                 <Input value={this.state.userData.email}
                        onChange={(email)=> this.setState(Object.assign(this.state.userData, {email: email.target.value}))}
                        onFocus={() => this.setState({error: ''})}
                        onKeyPress={this.handleKeyPress}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                 />
               </FormGroup>
               <FormGroup>
                 <Label for="password">Password</Label>
                 <Input value={this.state.userData.password}
                        onChange={(password)=> this.setState(Object.assign(this.state.userData, {password: password.target.value}))}
                        onFocus={() => this.setState({error: ''})}
                        onKeyPress={this.handleKeyPress}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                />
               </FormGroup>
               <FormGroup>
                 <Label for="repeatPassword">Repeat password</Label>
                 <Input value={this.state.userData.repeatPassword}
                        onChange={(repeatPassword)=> this.setState(Object.assign(this.state.userData, {repeatPassword: repeatPassword.target.value}))}
                        onFocus={() => this.setState({error: ''})}
                        onKeyPress={this.handleKeyPress}
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder="Repeat your password"
                />
               </FormGroup>
               <Input className='btn btn-primary'
                      value='Register'
                      type="button"
                      onClick={() => this.registerUser(this.state.userData)}
               />
              </div>
          </Form>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: '5%'
  },
  alertStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  }
};
