import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Colors from '../constants/Colors';
import moment from 'moment';

export default class HistoryItemComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  roundIcon = (type) => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: type === 'expense' ? Colors.red : Colors.green,
      width: 70,
      height: 70,
      borderRadius: 50
    }
  }

  generateDate = date => {
    return moment(date).format('L').replace(/\//g, '.');
  }

  render(){
    return(
      <div style={styles.container}>
        <div style={styles.historyContainer}>
          <div style={this.roundIcon(this.props.historyType)}>
            <div style={styles.roundIconText}>{this.props.historyType === 'expense' ? '-' : '+'}</div>
          </div>
          <div style={styles.historyDataContainer}>
            <div style={styles.amountStyle}>{this.props.amount} R</div>
            <div style={styles.dateStyle}>{this.generateDate(this.props.createdDate)}</div>
          </div>
        </div>
        <div style={styles.buttonStyle}>
          <Button style={{marginRight: '15%', display: 'flex'}} color="info" onClick={() => this.props.editAction()}>Edit</Button>
          <Button style={{ display: 'flex'}} color="danger" onClick={() => this.props.deleteAction()}>Delete</Button>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '2%',
    borderWidth: 5,
    borderColor: 'white'
  },
  roundIconText: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: 'bold'
  },
  amountStyle:{
    display: 'flex',
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold'
  },
  historyContainer: {
    display: 'flex',
    width: '100%'
  },
  historyDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5%'
  },
  dateStyle: {
    color: Colors.white,
    display: 'flex'
  },
  buttonStyle: {
    justifyContent: 'space-between',
    color: Colors.white,
    display: 'flex',
    alignItems: 'center',
    width: 60
  }
}
