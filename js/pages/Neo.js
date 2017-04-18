import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';//https://github.com/clauderic/react-infinite-calendar
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

export default class Neo extends React.Component{
	render() {
		var today = new Date();
		var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
		return(
			<div>
        		<h2>Near Earth Objects</h2>
        		<div class="col-md-10 col-md-offset-1">
        		 <InfiniteCalendar
    				width={250}
    				height={250}
    				selected={today}
    				disabledDays={[0,6]}
    				minDate={lastWeek}/>
        			<div class="panel panel-default">
        				<div class="panel-heading">Neo Content Here!</div>
        					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas consectetur urna, vel gravida purus eleifend at. Vivamus vitae lectus dictum, facilisis velit vel, euismod velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin a pellentesque nunc. Mauris id lectus vitae purus facilisis dapibus sit amet at turpis. Nunc id placerat magna, vel sodales justo. Duis posuere ultricies augue a tincidunt. Cras turpis est, vestibulum non justo vitae, volutpat sodales enim. Fusce iaculis dui orci, ut cursus lectus posuere quis. Pellentesque lacinia placerat tortor, ac luctus nisi varius elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id viverra sem. Integer non enim pharetra, gravida tortor non, cursus leo. Curabitur vel lacus et neque consequat euismod sit amet sit amet lacus.</p>
        			</div>
        		</div>
        	</div>
			);
	}
}