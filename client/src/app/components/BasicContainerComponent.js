import React, { Component } from 'react';
import Colors from '../constants/Colors';

import FormComponent from './FormComponent';
import HistoryComponent from './HistoryComponent';

export default class BasicContainerComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <div style={styles.titleStyle}>{this.props.title}</div>
          <hr style={styles.line}></hr>
          {
            !this.props.history ?
            <FormComponent
              formType={this.props.pageType}
              mainAction={(amount, type) => this.props.mainRequest(amount, type)}
              configureAction={amount => this.props.configureRequest(amount)}
            /> :
            <HistoryComponent
              histories={this.props.historiesData}
              deleteHistory={(history) => this.props.historyDelete(history)}
              editHistory={(history) => this.props.historyEdit(history)}
            />
          }
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%'
  },
  headerContainer: {
    display: 'flex',
    width: '50%',
    backgroundColor: Colors.grey,
    padding: '50px 120px 50px 120px',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  titleStyle: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  line: {
    border: '5px solid',
    borderColor: Colors.red,
    width: '100%'
  }
}
