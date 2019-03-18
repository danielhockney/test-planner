import React, { Component } from 'react';
import HistoryItemComponent from './HistoryItemComponent';

export default class HistoryComponent extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  renderHistoryItem = (histories) => {
    return histories.map((history, index) => (
      <HistoryItemComponent
        key={index}
        historyType={history.historyType}
        amount={history.amount}
        createdDate={history.createdAt}
        deleteAction={() => this.props.deleteHistory(history)}
        editAction={() => this.props.editHistory(history)}
      />
    ));
  }

  render(){
    return(
      <div style={styles.container}>
        {this.renderHistoryItem(this.props.histories)}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    flexDirection: 'column',
    width: '100%'
  }
}
