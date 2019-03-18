import React, { Component } from 'react';
import '../styles/Error404.css';

export default class Error404 extends Component {
  render(){
    console.log('err');
    return(
      <div id="notfound">
    		<div class="notfound">
    			<div class="notfound-404">
    				<h1>Oops!</h1>
    				<h2>404 - The Page can't be found</h2>
    			</div>
    			<a href="/configure">Go TO Homepage</a>
    		</div>
    	</div>
    )
  }
}
