import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import BasicContainerComponent from '../components/BasicContainerComponent';

import { POST } from '../core/CRUD';

export default class ConfigurePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  logout = () => {
    localStorage.removeItem('userId');
    this.setState({isLoggedIn: false});
  }

  async componentWillMount(){
    if(localStorage.getItem('userId')){
      this.setState({isLoggedIn: true});
    }
  }

  configure = async amount => {
    try {
      let response = await POST('users/mounthlyAmount/' + localStorage.getItem('userId'), {amount});
      if(response.success){
        window.location.href = '/main';
      } else {
        this.setState({error: response.error});
      }
    } catch (error) {
      this.setState({error: error.message});
    }
  }

  render(){
    return(
      <div>
        {!this.state.isLoggedIn ? <Redirect to="/login"/> : null}
        <NavbarComponent logoutAction={this.logout} isLoggedIn={this.state.isLoggedIn}/>
        <BasicContainerComponent
          title='Monthly amount'
          pageType='configure'
          configureRequest={amount => this.configure(amount)}
        />
      </div>
    )
  }
}
