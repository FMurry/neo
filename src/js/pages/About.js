import React from 'react';

export default class About extends React.Component{
	render() {
		return(
			<div>
        	<h2>About</h2>
        	<p>This is an React web application that takes NASA's NEOWs <a href="https://api.nasa.gov/api.html#NeoWS">API</a> and displays Near Earth Objects given a timeline (Currently only a week is supported)</p>
        	<h4>Using this app</h4>
        	<p>Using the calendar select a week to display information about near Earth objects for that given week. Click search and the information will populate in a table below</p>
			</div>
			);
	}
}