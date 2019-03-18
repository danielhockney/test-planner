import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import NavbarComponent from '../components/NavbarComponent';
import BasicContainerComponent from '../components/BasicContainerComponent';
import FormComponent from '../components/FormComponent';

import { GET, POST, DELETE, PUT } from '../core/CRUD';

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      modalVisible: false,
      user: {},
      editingHistory: {},
      error: ''
    };
  }

  async componentWillMount(){
    if(localStorage.getItem('userId')){
      this.setState({isLoggedIn: true});
      try {
        let response = await GET('users/' + localStorage.getItem('userId'));
        if(response.success){
          this.setState({user: response.data});
        } else {
          this.setState({error: response.error});
        }
      } catch (error) {
        this.setState({error: error.message});
      }
    }
  }

  logout = () => {
    localStorage.removeItem('userId');
    this.setState({isLoggedIn: false});
  }

  toggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      editingHistory: {},
      error: ''
    });
  }

  createHistory = async (amount, type, date, userId) => {
    try {
      let response = await POST('history/create', {
        amount: amount,
        historyType: type,
        createdAt: date,
        userId: userId
      });
      if(response.success){
        this.setState({user: response.data, error: ''});
      } else {
        console.log();
        this.setState({error: response.error});
      }
    } catch (error) {
      console.log(error.message);
      this.setState({error: error.message});
    }
  }

  mainTitle = (monthlyAmount, dailyAmount) => (
    <div style={{display: 'flex', width: '100%'}}>
      <div style={{display: 'flex'}}>You have</div>
      <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '2%', width: 500}}>
        <div style={{display: 'flex'}}>{monthlyAmount} R left for the month</div>
        <div style={{display: 'flex'}}>{dailyAmount} R left for the day</div>
      </div>
    </div>
  )

  deleteHistory = async (history) => {
    try {
      let response = await DELETE('history/delete', {
        history: history,
        userId: localStorage.getItem('userId')
      });
      if(response.success){
        this.setState({user: response.data, error: ''});
      } else {
        this.setState({error: response.error});
      }
    } catch (error) {
      this.setState({error: error.message});
    }
  }

  editHistory = (history) => {
    this.toggle();
    this.setState({editingHistory: history});
  }

  updateHistory = async (oldHistory, newHistory, userId) => {
    try {
      let response = await PUT('history/update', {
        oldHistory, newHistory, userId
      });
      if(response.success){
        this.setState({user: response.data, error: ''});
        this.toggle();
      } else {
        this.toggle();
        this.setState({error: response.error})
      }
    } catch (error) {
      this.toggle();
      this.setState({error: error.message});
    }
  }

  render(){
    return(
      <div>
        {!this.state.isLoggedIn ? <Redirect to="/login"/> : null}
        <NavbarComponent logoutAction={this.logout} isLoggedIn={this.state.isLoggedIn}/>
        {this.state.error ? <div style={{color: 'red'}}>{this.state.error}</div> : null}
        <BasicContainerComponent
          title={this.mainTitle(this.state.user.monthlyAmount, this.state.user.dailyAmount)}
          pageType='main'
          mainRequest={(amount, type) => this.createHistory(amount, type, new Date(), localStorage.getItem('userId'))}
        />
        <BasicContainerComponent
          title='History'
          history={true}
          historiesData={this.state.user.history ? this.state.user.history : []}
          historyDelete={(history) => this.deleteHistory(history)}
          historyEdit={(history) => this.editHistory(history)}
        />
        {
          this.state.modalVisible ?
          <Modal isOpen={this.state.modalVisible} toggle={this.toggle} fade={false}>
            <ModalHeader toggle={this.toggle}>Edit history</ModalHeader>
            <ModalBody>
              <FormComponent
                formType='edit'
                mainAction={(amount, actionType) => this.updateHistory(this.state.editingHistory, {
                  amount: amount,
                  historyType: actionType,
                  createdAt: new Date()
                }, localStorage.getItem('userId'))}
              />
            </ModalBody>
          </Modal> : null
        }
      </div>
    )
  }
}
