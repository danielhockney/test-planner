import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { Button, Input } from 'reactstrap';

export default class FormComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: '',
      error: ''
    };
  }

  buttonStyle = (color, type) => {
    return {
      backgroundColor: Colors[color],
      color: Colors.white,
      width: type === 'configure' ? '25%' : '48%',
      borderRadius: 30,
      border: 'none'
    };
  }

  inputStyle = type => {
    return {
      width: type === 'configure' ? '75%' : '50%',
      marginRight: type === 'configure' ? '2%' : '2%',
      backgroundColor: Colors.pinkishGrey,
      borderRadius: 30,
      border: 'none',
      color: Colors.white
    };
  }

  handleKeyPress = async e => {
    if(e.key === 'Enter') {
      await this.sendRequest(this.state.amount, 'configure');
    }
  }

  validateInput = amount => {
    if(!amount){
      return { success: false, error: 'Please enter your monthly amount!' };
    }
    if(isNaN(amount)){
      return { success: false, error: 'Please type valid numbers for amount!' };
    }
    if(amount < 0){
      return { success: false, error: 'Please type only positive numbers!' };
    }
    if(amount > 999999999999){
      return { success: false, error: 'Amount can not be more then 999999999999!' };
    } else {
      return { success: true };
    }
  }

  sendRequest = (amount, pageType, actionType) => {
    if(this.validateInput(amount).success){
      this.setState({amount: ''});
      if(pageType === 'configure'){
        this.props.configureAction(amount);
      } else {
        if(actionType && actionType === 'expense'){
          this.props.mainAction(amount, actionType);
        } else {
          this.props.mainAction(amount, actionType);
        }
      }
    } else {
      this.setState({error: this.validateInput(amount).error, amount: ''});
    }
  }

  render(){
    return(
      <div style={styles.container}>
        {this.state.error ? <div style={{color: 'red'}}>{this.state.error}</div> : null}
        <div style={{display: 'flex'}}>
          <Input value={this.state.amount}
                 style={this.inputStyle(this.props.formType)}
                 onChange={amount => this.setState({amount: amount.target.value, error: ''})}
                 onFocus={() => this.setState({error: ''})}
                 onKeyPress={this.props.formType === 'configure' ? this.handleKeyPress : null}
                 type="number"
          />
          {
            this.props.formType === 'configure' ?
            <Button onClick={() => this.sendRequest(this.state.amount, this.props.formType)} style={this.buttonStyle('green', this.props.formType)}>Set</Button> :
            <div style={styles.buttonsContainer}>
              <Button onClick={() => this.sendRequest(this.state.amount, this.props.formType, 'expense')} style={this.buttonStyle('red', this.props.formType)}>Expense</Button>
              <Button onClick={() => this.sendRequest(this.state.amount, this.props.formType, 'income')} style={this.buttonStyle('green', this.props.formType)}>Income</Button>
            </div>
          }
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  },
  buttonsContainer: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between'
  }
}
